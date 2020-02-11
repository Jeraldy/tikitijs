enum ACTION_TYPE {
    REMOVE = "REMOVE",
    ADD = "ADD"
}

export default class Tikiti {
    private node: any;
    private context: any;
    private update: any;
    private domTree: Array<{}>;
    private domTreeUpdate: Array<{}>;
    private actionCollector: Array<{}>;
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
        this.componentDidUpdate()
        return this.state
    }

    private caseOldLonger(list_old: Array<string>, list_new: Array<string>) {
        list_old.forEach((v: string, index: number) => {
            if (index < list_new.length) {
                if (v != list_new[index]) {
                    this.replaceChild(index)
                }
            } else {
                if (this.isInDOM(index)) {
                    this.removeChild(index)
                }
            }
        });
        this.postCheck(list_new);
    }

    private postCheck(list_new: Array<string>) {
        list_new.forEach((_, index: number) => {
            if (this.shouldBeCleaned(index)) {
                this.replaceChild(index)
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

    private oldChild(index: number) {
        //@ts-ignore
        return this.domTree[index].child
    }

    private newChild(index: number) {
        //@ts-ignore
        return this.domTreeUpdate[index].child
    }

    private replaceChild(index: number) {
        this.oldChild(index).parentNode
            .replaceChild(this.newChild(index), this.oldChild(index))
            
    }

    private removeChild(index: number) {
        this.oldChild(index).parentNode
            .removeChild(this.oldChild(index))
    }


    private updateDomTree(index: number, aType: string) {
        switch (aType) {
            case ACTION_TYPE.REMOVE:
                return
            case ACTION_TYPE.ADD:
                return
            default:
                break
        }
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
        console.log("============ NEW DOM ================")
        console.log(this.update)
        console.log(this.domTreeUpdate)
        console.log(list_new)
        console.log("**************************************")

        if (list_old.length > list_new.length) {
            this.caseOldLonger(list_old, list_new)
        }


        // for (var i = 0; i < list_old.length; i++) {

        //     if (list_new[i]) {
        //         //@ts-ignore
        //         if (list_new[i] != list_old[i]) {
        //             //@ts-ignore
        //             this.domTree[i].child.parentNode.removeChild(this.domTree[i].child)
        //         } else {
        //             if (i == 6) {
        //                 //@ts-ignore
        //                 console.log(this.domTree[i])
        //                 //@ts-ignore
        //                 console.log(this.domTree[i].child.childElementCount)
        //             }
        //             //@ts-ignore
        //             if (this.domTree[i].child.children.length == 0
        //                 // //@ts-ignore
        //                 // && this.domTree[i].child.textContent !=
        //                 // //@ts-ignore
        //                 // this.domTreeUpdate[i].child.textContent
        //             ) {
        //                 console.log("THIS HAPPED AT " + i)
        //             }
        //         }
        //     } else {
        //         //@ts-ignore
        //         this.domTree[i].child.parentNode.removeChild(this.domTree[i].child)
        //     }
        // }

        // for (var i = 0; i < list_new.length; i++) {
        //     console.log(list_new[i])
        //     console.log(list_old[i])
        //     console.log("*****************")
        //     if (list_old[i]) {
        //         //@ts-ignore
        //         if (list_new[i] != list_old[i]) {
        //             //@ts-ignore
        //             this.domTree[i].child.parentNode.removeChild(this.domTree[i].child)
        //         }
        //     } else {
        //         //@ts-ignore
        //         this.domTree[i].child.parentNode.appendChild(this.domTreeUpdate[i].child)
        //         console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        //         console.log(list_new[i])
        //         console.log(list_old[i])
        //         console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        //     }
        // }

        // for (var i = 0; i < list_new.length; i++) {
        //     if (!list_old.includes(list_new[i])) {
        //         //console.log("*****************")
        //         //@ts-ignore
        //         //console.log(this.domTree[i].parentNode)
        //         //console.log("*****************")
        //         //@ts-ignore
        //         //this.domTree[i].child.parentNode.appendChild(_domTree[i].child)
        //     }
        // }
    }

    private updateDom() {
        /*
        CASE I: Removal
        old: [1,2,3,4]
        new: [1,2]
        Update Process:
        Remove in old not in new
        old.forEach((node)=>{
            if(node not in new) => old.remove(node)
        })

        CASE II: Node Addition
        old: [1,2,3,4]
        new: [1,2,3,4,5]
        Update Process:
        Remove in old not in new
        new.forEach((node)=>{
            if(node not in old) => old.add(node)
        })  
  
        CASE II: Node Addition
        old: [1,2,3,4]
        new: [1,2,7]
        Update Process:
        Remove in old not in new
        new.forEach((node)=>{
            if(node not in old) => old.add(node)
        })

       old
        div1
          div2#remove
           div3
         div4
        new 
        div1
          **div2**
           div3
          div4
        */

        // for (var i = 0; i < _old.length; i++) {
        //     for (var j = 0; j < _new.length; j++) {
        //         if (_old_names[i] == _new_names[j]) {
        //             //@ts-ignore
        //             if (_old[j].nodeName == "BUTTON") {
        //                 //@ts-ignore
        //                 _old[j].onclick = _new[i].onclick
        //             }
        //             //@ts-ignore
        //             for (var key of Object.keys(_new[i].attributes)) {
        //                 //@ts-ignore
        //                 var ch = _new[i].attributes[key]
        //                 //@ts-ignore
        //                 _old[j].setAttribute(ch.name, ch.value)
        //             }
        //         }
        //     }
        // }
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

        this.removeNodes()
        //this.node.parentNode.replaceChild(this.update,this.node)
        //this.node = this.update
    }

    private generateNames() {
        var _new_names = []
        var _old_names = []

        for (var i = 0; i < this.domTreeUpdate.length; i++) {
            //@ts-ignore
            _new_names.push(this.domTreeUpdate[i].child.nodeName)
        }

        for (var i = 0; i < this.domTree.length; i++) {
            //@ts-ignore
            _old_names.push(this.domTree[i].child.nodeName)
        }
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