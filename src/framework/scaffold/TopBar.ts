import Nav from "../core/Nav";

interface Params {
    //topBarEndActions?: TopBarEndActions,
   // topBarStartActions?: TopBarStartActions
}

export default class TopBar {
    node: any;
    constructor(params?: Params) {
        this.node = Nav({
            id: "topBar",
            style: {
                backgroundColor: "#FFFFFF",
                boxShadow: "0 3px 3px -3px rgba(0,0,0,.2)",
                color: "black",
                height:"50px"
            }
        })
        return this.node;
    }
}