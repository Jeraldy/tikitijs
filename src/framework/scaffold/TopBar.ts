import Nav from "../core/Nav";
import TextView from "../core/TextView";
import Button from "../core/Button";

export default class TopBar {
    node: any;
    constructor(params?: any) {
        this.node = Nav({
            id: "topBar",
            style: {
                backgroundColor: "#FFFFFF",
                boxShadow: "0 3px 3px -3px rgba(0,0,0,.2)",
                color: "black",
                height:"50px"
            },
            children:[
                Button({
                    onclick: () => params.toggleNav(),
                    children:[
                        TextView("Open")
                    ]
                })
            ]
        })
        return this.node;
    }
}