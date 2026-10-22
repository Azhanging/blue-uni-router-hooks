export declare class RouterBefore {
    private beforeHooks;
    listen(nextHook: Function): void;
    run(to: any, from: any, next: Function): void;
}
