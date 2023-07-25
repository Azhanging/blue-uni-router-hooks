export declare class RouterBefore {
    private beforeHooks;
    constructor();
    listen(nextHook: Function): void;
    run(to: any, from: any, next: Function, index?: number): void;
}
