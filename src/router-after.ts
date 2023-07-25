import { hook, isFunction } from "./tools";

//路由after hook
export class RouterAfter {
  //存储队列
  afterHooks: Function[];
  constructor() {
    this.afterHooks = [];
  }
  //添加订阅
  listen(afterHook: Function) {
    this.afterHooks.push(afterHook);
  }
  //分发订阅
  run(to: any, from: any) {
    this.afterHooks.forEach((currentAfterHook) => {
      hook(null, currentAfterHook, [to, from]);
    });
  }
}
