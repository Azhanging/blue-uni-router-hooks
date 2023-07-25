export declare class RouterAfter {
    afterHooks: Function[];
    constructor();
    listen(afterHook: Function): void;
    run(to: any, from: any): void;
}
