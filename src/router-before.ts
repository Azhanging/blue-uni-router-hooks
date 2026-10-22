import { hook, isFunction } from "./tools";

type NextStatus =
  | string | Error | boolean | Function
  | Record<string, any> | undefined | void;

function preventRouterNext(s: NextStatus): boolean {
  if (typeof s === "string") return true;
  if (s instanceof Error) return true;
  if (s === false) return true;
  if (typeof s === "object" && s !== null && !Array.isArray(s)) return true;
  return false;
}

export class RouterBefore {
  private beforeHooks: Function[] = [];

  listen(nextHook: Function) {
    if (isFunction(nextHook)) this.beforeHooks.push(nextHook);
  }

  run(to: any, from: any, next: Function) {
    const hooks = this.beforeHooks;
    let index = 0;
    let finished = false;

    // 统一出口：无论成功/失败/中断，只出一次
    const finish = (status?: NextStatus) => {
      if (finished) return;
      finished = true;
      if (!isFunction(next)) return;          // 风险3：next 非函数不崩
      try {
        next(status);
      } catch (e) {
        // 风险2：next 自身抛错不吞、不破坏流程，异步上报
        setTimeout(() => { throw e; }, 0);
      }
    };

    // 迭代驱动，彻底消除递归栈溢出
    const step = () => {
      while (index < hooks.length) {
        const current = hooks[index];
        if (!isFunction(current)) { index++; continue; }

        let called = false;
        const handler = (status?: NextStatus) => {
          if (called || finished) return;
          called = true;
          if (preventRouterNext(status) || index === hooks.length - 1) {
            finish(status);
          } else {
            index++;
            step();               // 仅在异步/中断时再入，深度 = 异步守卫数
          }
        };

        try {
          const ret: any = hook(null, current, [to, from, handler]);
          // 风险1：异步守卫 reject 转 next(error)，不再 unhandledRejection
          if (ret && typeof ret.then === "function") {
            ret.catch((err: any) => handler(err instanceof Error ? err : new Error(String(err))));
          }
        } catch (err) {
          handler(err as Error);
        }
        return; // 等待该守卫通过 handler 推进
      }
      finish(); // 队列走完
    };

    step();
  }
}