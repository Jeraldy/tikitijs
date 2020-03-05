interface LifeCycleMethods {
    componentDidMount(): void;
    componentDidUpdate(): void;
    componetWillUpdate(): void;
    mapStoreToState(reduxState: any): {};
    render(): any;
}
export declare class StatefulWidget implements LifeCycleMethods {
    mapStoreToState(reduxState: any): {};
    componentDidMount(): void;
    componentDidUpdate(): void;
    componetWillUpdate(): void;
    render(): void;
    private node;
    readonly props: any[];
    state: any;
    constructor(props?: any);
    setState(NewState: {}, render?: any): Promise<any>;
    private componentMounted;
    connect(): any;
    static Init: {
        new (entryNode: any): {};
    };
}
export declare const Tikiti: {
    Init(entryNode: any): void;
};
export {};
