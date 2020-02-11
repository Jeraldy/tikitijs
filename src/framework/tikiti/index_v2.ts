import { domTreeUpdatedTEST } from "./Tests";
//var morphdom = require('../../../node_modules/morphdom/src/index');
import morphdom from '../../../node_modules/morphdom/src/index';

enum ACTION_TYPE {
    REMOVE = "REMOVE",
    REPLACE = "REPLACE"
}

export default class Tikiti {
    private node: any;
    private context: any;
    private update: any;
    private domTree: {}[] = [];
    private domTreeUpdate: Array<{}> = [];
    private actionCollector: { index: number, aType: string }[] = [];
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
        this.domTreeUpdate = this.generateDomTree(this.update).tree
        this.updateDom()
        console.log("Calling...")
        this.componentDidUpdate()
        return this.state
    }

    private caseNewLonger(list_old: Array<string>, list_new: Array<string>) {
        list_new.forEach((v: string, index: number) => {
            if (index < list_old.length) {
                if (v != list_old[index]) {
                    console.log("REPLACE THIS === " + index)
                    // this.replaceChild(index)
                    // this.actionCollector.push({
                    //     index, aType: ACTION_TYPE.REPLACE
                    // })
                }
            } else {
                this.appendChild(index)
            }
        });
        this.postCheck(list_new);
    }

    private caseOldLonger(list_old: Array<string>, list_new: Array<string>) {
        list_old.forEach((v: string, index: number) => {
            if (index < list_new.length) {
                if (v != list_new[index]) {
                    this.replaceChild(index)
                    this.actionCollector.push({
                        index, aType: ACTION_TYPE.REPLACE
                    })
                }
            } else {
                if (this.isInDOM(index)) {
                    this.removeChild(index)
                }
                this.actionCollector.push({
                    index, aType: ACTION_TYPE.REMOVE
                })
            }
        });
        this.postCheck(list_new);
    }

    private postCheck(list_new: Array<string>) {
        list_new.forEach((_, index: number) => {
            if (this.shouldBeCleaned(index)) {
                this.replaceChild(index)
                this.actionCollector.push({
                    index, aType: ACTION_TYPE.REPLACE
                })
            }
        });
    }

    private shouldBeCleaned(index: number) {
        return (
            this.oldChild(index).innerHTML
            != this.newChild(index).innerHTML
            && this.oldChild(index).childElementCount == 0
        )
    }

    private isInDOM(index: number) {
        return document.body
            .contains(this.oldChild(index));
    }

    //@ts-ignore
    private oldChild = (index: number) => this.domTree[index].child

    //@ts-ignore
    private newChild = (index: number) => this.domTreeUpdate[index].child

    private replaceChild(index: number) {
        this.oldChild(index).parentNode
            .replaceChild(this.newChild(index), this.oldChild(index))
    }

    private appendChild(index: number) {
        this.oldChild(index - 1).parentNode
            .appendChild(this.newChild(index))
        this.domTree.push(this.domTreeUpdate[index])
    }

    private removeChild(index: number) {
        this.oldChild(index).parentNode
            .removeChild(this.oldChild(index))
    }

    private updateDomTree() {
        var _domTree: {}[] = []
        var indices: number[] = []

        this.actionCollector.forEach((el) => {
            switch (el.aType) {
                case ACTION_TYPE.REPLACE:
                    //@ts-ignore
                    this.domTree[el.index].child = this.newChild(el.index);
                    break;
                case ACTION_TYPE.REMOVE:
                    indices.push(el.index);
                    break;
                default:
                    break
            }
        })

        this.domTree.forEach((_, index) => {
            if (!indices.includes(index)) {
                _domTree.push(this.domTree[index])
            }
        })

        this.domTree = _domTree
        domTreeUpdatedTEST(this.domTree, this.domTreeUpdate)
    }

    private removeNodes() {
        var list = this.generateNames()

        var list_old = list._old_names;
        var list_new = list._new_names;

        console.log("**************************************")
        console.log("============ OLD DOM ================")
        console.log(this.node)
        console.log(this.domTree)
        console.log(list_old)
        console.log(list_old.length)
        console.log("============ NEW DOM ================")
        console.log(this.update)
        console.log(this.domTreeUpdate)
        console.log(list_new)
        console.log(list_new.length)
        console.log("**************************************")

        if (list_old.length > list_new.length) {
            this.caseOldLonger(list_old, list_new)
            this.updateDomTree()
        } else if (list_old.length < list_new.length) {
            this.caseNewLonger(list_old, list_new)
            //this.updateDomTree()
        } else {
            console.log("NOT IMPLEMENTED")
        }

    }

    private updateDom() {
        var newTree = this.generateDomTree(this.update)
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
        morphdom(this.node, this.update);
        //this.removeNodes()
    }

    private generateNames() {
        var _new_names: any[] = []
        var _old_names: any[] = []
        this.domTreeUpdate.forEach((_, index: number) => {
            _new_names.push(this.newChild(index).nodeName)
        })
        this.domTree.forEach((_, index: number) => {
            _old_names.push(this.oldChild(index).nodeName)
        })
        return { _new_names, _old_names }
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