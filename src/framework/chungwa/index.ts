export default class Chungwa {
    state: any;
    node: any;
    context: any;
    constructor() {
        this.componentDidMount()
    }

    async setState(NewState: {}) {
        this.componetWillUpdate()
        this.state = { ...this.state, ...NewState }
        var update = this.context.render()
        await this.node.parentElement.replaceChild(update, this.node)
        this.node = update;
        update.focus()
        this.componentDidUpdate()
        return this.state
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