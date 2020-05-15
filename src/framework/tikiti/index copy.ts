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
        this.componentMounted()
    }

    async setState(NewState: {}, id: string) {
        this.componetWillUpdate()
        this.state = { ...this.state, ...NewState }
        //await reconcile(this.node, this.render());
        let newNode = this.render()
        this.node.parentNode.replaceChild(newNode, this.node)
        this.node = newNode
        this.focusTarget(id);
        this.componentDidUpdate()
        return this.state
    }

    private componentMounted() {
        document
            .addEventListener("DOMContentLoaded", (_) => this.componentDidMount());
    }

    private focusTarget(id: string){
        if(id){
            document.getElementById(id).focus();
        }
    }

    connect() {
        this.node = this.render()
        return this.node
    }

    private getCordinates(e: Event) {
        //@ts-ignore
        let rect = e.target.getBoundingClientRect()
        return { x: rect.left, y: rect.top }
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
        //@ts-ignore
        //var x = target.elementFromPoint(cordinates.x, cordinates.y);
        console.log(target)
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

