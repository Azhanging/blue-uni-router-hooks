/*
 * 处理路由下一跳
 * */
import { hook, isFunction } from "./tools";

//下一跳的状态处理
type NextStatus = string | Error | boolean | Function;

function preventRouterNext(nextStatus: NextStatus): boolean {
  return (
    typeof nextStatus === `string` ||
    nextStatus instanceof Error ||
    nextStatus === false
  );
}

export class RouterBefore {
  //收集处理
  private beforeHooks: Function[];
  constructor() {
    this.beforeHooks = [];
  }
  //添加到队里
  listen(nextHook: Function) {
    this.beforeHooks.push(nextHook);
  }
  //下一步的数据处理
  run(to: any, from: any, next: Function, index: number = 0) {
    const beforeHooks = this.beforeHooks;
    //四种情况，path，false，Error参照官方文档中的next处理
    // true 或者 undefined（没有返回值） 走默认的next()处理
    //当前的nextHook
    const currentBeforeHook = beforeHooks[index];
    //hook处理
    const hookHandler = (status: NextStatus): void => {
      //需要阻止处理了
      if (preventRouterNext(status)) {
        next(status);
      } else {
        //没有后续了
        if (index === beforeHooks.length - 1) {
          next(status);
        } else {
          this.run(to, from, next, index + 1);
        }
      }
    };
    //fn处理
    if (isFunction(currentBeforeHook)) {
      hook(null, currentBeforeHook, [
        to,
        from,
        (status: NextStatus) => {
          hookHandler(status);
        },
      ]);
    } else {
      hookHandler(currentBeforeHook);
    }
  }
}
