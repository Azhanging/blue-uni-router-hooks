import { hook, isFunction } from "./tools";

export class RouterAfter {
  afterHooks: Function[] = [];

  listen(afterHook: Function) {
    if (isFunction(afterHook)) this.afterHooks.push(afterHook);
  }

  run(to: any, from: any) {
    this.afterHooks.forEach((h) => {
      try {
        const ret: any = hook(null, h, [to, from]);
        if (ret && typeof ret.then === "function") {
          ret.catch((err: any) => console.error("[router-after] async error:", err));
        }
      } catch (err) {
        console.error("[router-after] sync error:", err);
      }
    });
  }
}