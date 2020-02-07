import morphdom from '../reconcile/index';

export default class Tikiti {
    private node: any;
    private context: any;
    private update: any;
    private domTree: {}[] = [];
    props: any;
    state: any;

    constructor(props?: any) {
        this.props = props;
        this.componentDidMount()
    }

    async setState(NewState: {}) {
        this.componetWillUpdate()
        this.state = { ...this.state, ...NewState }
        this.update = this.context.render()
        this.updateDom()
        this.componentDidUpdate()
        return this.state
    }

    private updateDom() {
        var newTree = this.generateDomTree(this.update)
        for (var i = 0; i < newTree.tree.length; i++) {
            for (var attr in this.domTree[i]) {
                if (attr != "child") {
                    //@ts-ignore	
                    if (this.domTree[i][attr] != newTree.tree[i][attr]) {
                        //@ts-ignore
                        this.domTree[i][attr] = newTree.tree[i][attr]
                        //@ts-ignore
                        this.domTree[i].child.setAttribute(attr, newTree.tree[i][attr])
                    }
                }
            }
        }
        morphdom(this.node, this.update);
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
        this.domTree = tree.tree;
    }


    componentDidMount() { }
    componentDidUpdate() { }
    componetWillUpdate() { }

}