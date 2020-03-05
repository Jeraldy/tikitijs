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
    private cordinates: any;
    readonly props: any[];
    state: any

    constructor(props?: any) {
        this.props = props
        this.cordinates = null;
        this.componentMounted()
    }

    async setState(NewState: {}, e?: Event) {
        this.componetWillUpdate()
        this.state = { ...this.state, ...NewState }
        //await reconcile(this.node, this.render());
        this.cordinates = e ? this.getCordinates(e) : null;
        let x = this.render()
        this.node.parentNode.replaceChild(x, this.node)
        this.node = x
        activateTarget(this.cordinates)
        this.componentDidUpdate()
        return this.state
    }

    private componentMounted() {
        document
            .addEventListener("DOMContentLoaded", (_) => this.componentDidMount());
    }

    connect() {
        this.node = this.render()
        return this.node
    }

    private getCordinates(e: Event) {
        //@ts-ignore
        let rect = e.target.getBoundingClientRect()
        return { x: rect.x, y: rect.y }
    }

}

export const Tikiti = {
    Init(entryNode: any) {
        document.body.appendChild(entryNode)
    }
}
//00s7
function activateTarget(cordinates: any) {
    if (cordinates) {
        //@ts-ignore
        var target = document.elementFromPoint(cordinates.x, cordinates.y);
        if (target.childNodes) {
            target.childNodes.forEach((el) => {
                if (el.nodeName == 'INPUT') {
                    //@ts-ignore
                    el.focus()
                    //@ts-ignore
                    el.selectionStart = el.selectionEnd = el.value.length;
                }
            })
        } else {
            //@ts-ignore
            target.focus()
        }
    }
}

//"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp

