export function hook(context: any, cb: Function | any, args: any[] = []) {
  if (isFunction(cb)) {
    return cb.apply(context, args);
  }
  return cb;
}

export function isFunction(cb: any): boolean {
  return typeof cb === `function`;
}
