import reconcile from '../reconcile/index';

interface LifeCycleMethods {
    componentDidMount(): void
    componentDidUpdate(): void
    componetWillUpdate(): void
    render(): any
}


export default class Tikiti implements LifeCycleMethods {
   
    componentDidMount(): void { }
    componentDidUpdate(): void { }
    componetWillUpdate(): void { }
    render() {
        throw new Error("Method not implemented.");
    } 

    private node: any;
    state: any
    props: any[];


    constructor(props?: any) {
        this.props = props
        this.componentMounted()
    }

    async setState(NewState: {}) {
        this.componetWillUpdate()
        this.state = { ...this.state, ...NewState }
        await reconcile(this.node, this.render());
        this.componentDidUpdate()
        return this.state
    }

    private componentMounted() {
        document
            .addEventListener("DOMContentLoaded",
                (_) => this.componentDidMount());
    }

    connect() {
        this.node = this.render()
        return this.node
    }

    static Init = class {
        constructor(entryNode: any) {
            document.body.appendChild(entryNode)
        }
    }
}
