export default class Chungwa {
    state: any;
    node: any;
    context: any;
    props: any;

    constructor(props?: any) {
        this.props = props;
        this.componentDidMount()
    }

    async setState(NewState: {}) {
        this.componetWillUpdate()
        this.state = { ...this.state, ...NewState }
        var update = this.context.render()
        this.node.parentElement.replaceChild(update, this.node)
        this.node = update;
        this.componentDidUpdate()
        this.domEventsListener()
        return this.state
    }

    private domEventsListener() {
        document.addEventListener("keyup", (e) => {
            //@ts-ignore
            var target = document.querySelectorAll('[ref="' + e.target.getAttribute("ref") + '"]')[0]
            //@ts-ignore
            target.focus()
            //@ts-ignore
            target.selectionStart = target.selectionEnd = target.value.length;
        })
    }

    connectedCallBack(_this: any) {
        this.context = _this
        this.node = _this.render()
        return this.node
    }

    componentDidMount() { }
    componentDidUpdate() { }
    componetWillUpdate() { }

}