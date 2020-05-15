var h = require('virtual-dom/h');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');
var parser = require('html2hscript');

//@ts-ignore
var rootNode;

export const Tikiti = {
    Init(entryNode: any) {
        parser(entryNode.innerHTML,
        function (_err: any, newTree: any) {
            console.log(newTree)
            rootNode = createElement(h("div", {"style":{"display":"flex","flex-wrap":"wrap","justify-content":"flex-start"}}, [ h("input", {"attributes":{"value":"","type":"text"}}, [ h("button", [ " Add Todo" ]) ]) ]), h("ul"), h("button", [ "Toggle Width-0" ]), h("div", {"style":{"width":"200px","height":"200px","background-color":"#B0BF1A","transition":"height .3s"}}, [ h("div", [ "Item 1" ]), h("div", [ "Item 2" ]), h("div", [ "Item 3" ]) ]));
            console.log(rootNode)
            document.body.appendChild(rootNode);
        });
    }
}

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
    private _node: any;
    readonly props: any[];
    private update: any;
    private domTree: {}[] = [];
    state: any

    constructor(props?: any) {
        this.props = props
        this.componentMounted()
    }

    async setState(NewState: {}, e?: Event) {
        this.componetWillUpdate()
        this.state = { ...this.state, ...NewState }
        let oldTreeH = this.node
        let _newTree = null
        //console.log(rootNode)
        //@ts-ignore
        parser(this.render().innerHTML,
            function (_err: any, newTree: any) {
                var patches = diff(oldTreeH, newTree);
                //@ts-ignore
                rootNode = patch(rootNode, patches);
                console.log(rootNode)
                //console.log(newTree)
                _newTree = newTree
            });
        this.node = _newTree

        this.componentDidUpdate()
        return this.state
    }

    rootify(rnd: any) {
        let root = document.createElement('div')
        root.setAttribute('id', 'root')
        root.appendChild(rnd)
        return root
    }


    setEffect(NewState: {}) {
        this.componetWillUpdate()
        this.state = { ...this.state, ...NewState }
        this.updateDom(this.render())
        this.componentDidUpdate()
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
                childProps = { ...childProps, [ch.name]: ch.value }
            }
            tree.push({ ...childProps, child })
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

    private updateDom(newDom: any) {
        var newTree = this.generateDomTree(newDom)
        for (var i = 0; i < newTree.tree.length; i++) {
            for (var attr in this.domTree[i]) {
                // Update Other Props
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
    }

    private componentMounted() {
        document
            .addEventListener("DOMContentLoaded",
                (_) => this.componentDidMount());
    }

    private focusTarget(e: Event) {
        if (e) {
            //@ts-ignore
            let el = document.getElementById(e.target.id);
            el.focus();
            //@ts-ignore
            el.selectionStart = el.selectionEnd = el.value.length;
        }
    }

    connect() {
        this._node = this.render()
        let nodeH = null
        //@ts-ignore
        parser(this._node.innerHTML,
            function (_err: any, hscript: any) {
                nodeH = hscript
            });
        this.node = nodeH
        return this._node
    }

    private initDomTree() {
        var tree = this.generateDomTree(this.node)
        this.domTree = tree.tree;
    }
}

