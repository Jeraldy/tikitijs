import { DiffDOM } from "../../../node_modules/diff-dom/src/index";

export default class Tikiti {
    state: any;
    private node: any;
    private context: any;
    props: any;
    private domTree: Array<{}>;
    private domTreeNodeNames: Array<string>;
    private domTreeNodeList: Array<any>;

    constructor(props?: any) {
        this.props = props;
        this.domTree = []
        this.domTreeNodeNames = []
        this.domTreeNodeList = []
        this.componentDidMount()
    }

    async setState(NewState: {}) {
        this.componetWillUpdate()
        this.state = { ...this.state, ...NewState }
        var update = this.context.render()
        this.updateDomTree(update)
        this.componentDidUpdate()
        return this.state
    }

    private updateDomTree(update: any) {
       // var newTree = this.generateDomTree(update)
        var dd = new DiffDOM();
        var diff = dd.diff(this.node, update);
        dd.apply(this.node, diff);
        console.log(diff)
        console.log("=====================")
    }

    private generateDomTree(dom: any): any {
        var names: any[] = [];
        var tree: {}[] = []
        var nodeList = this.domTreeTraversal(dom);
        nodeList.forEach((child: any) => {
            names.push(child.nodeName)
            var childProps = {}
            for (var key of Object.keys(child.attributes)) {
                var ch = child.attributes[key]
                childProps = { ...childProps, ...{ [ch.name]: ch.value } }
            }
            tree.push({ ...{ ...childProps, child } })
            childProps = {}
        });
        return { names, tree, nodeList }
    }

    private domTreeTraversal(dom: any): Array<Object> {
        var treeWalker = document.createTreeWalker(
            dom,
            NodeFilter.SHOW_ELEMENT,
            { acceptNode: (node) => NodeFilter.FILTER_ACCEPT },
            false
        );

        var nodeList = [];
        var currentNode = treeWalker.currentNode;

        while (currentNode) {
            nodeList.push(currentNode);
            currentNode = treeWalker.nextNode();
        }
        return nodeList;
    }

    connectedCallBack(_this: any) {
        this.context = _this
        this.node = _this.render()
        this.initDomTree()
        return this.node
    }

    private initDomTree() {
        var tree = this.generateDomTree(this.node)
        this.domTreeNodeNames = tree.names;
        this.domTree = tree.tree;
        this.domTreeNodeList = tree.nodeList;
    }

    componentDidMount() { }
    componentDidUpdate() { }
    componetWillUpdate() { }

}