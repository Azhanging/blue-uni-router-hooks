export declare class RouterAfter {
    afterHooks: Function[];
    listen(afterHook: Function): void;
    run(to: any, from: any): void;
}
