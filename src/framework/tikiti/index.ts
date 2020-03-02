import reconcile from '../reconcile/index';

interface LifeCycleMethods {
    componentDidMount(): void
    componentDidUpdate(): void
    componetWillUpdate(): void
    mapStoreToState(reduxState: any): {}
    render(): any
}


export class StatefulWidget implements LifeCycleMethods {
    mapStoreToState(reduxState: any): {} { return {} }
    componentDidMount(): void { }
    componentDidUpdate(): void { }
    componetWillUpdate(): void { }
    render() {
        throw new Error("Method not implemented.");
    }

    private node: any;
    readonly props: any[];
    state: any
    
    constructor(props?: any) {
        this.props = props
        this.componentMounted()
    }

    async setState(NewState: {}, render?: any) {
        this.componetWillUpdate()
        this.state = { ...this.state, ...NewState }
        var x = this.node
        var y = this.render()
        await reconcile(x, y);
       // this.runTest(x, y)
        this.componentDidUpdate()
        return this.state
    }

    private componentMounted() {
        document
            .addEventListener("DOMContentLoaded",(_) => this.componentDidMount());
    }

    connect() {
        this.node = this.render()
        return this.node
    }

    runTest(x: any, y: any) {
        //@ts-ignore
        console.log(x.innerHTML.length == y.innerHTML.length)
        if(x.innerHTML.length != y.innerHTML.length){
            x.parent
        }
    }

    static Init = class {
        constructor(entryNode: any) {
            document.body.appendChild(entryNode)
        }
    }
}

export const Tikiti = {
    Init(entryNode: any) {
        document.body.appendChild(entryNode)
    }
}

//"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp

