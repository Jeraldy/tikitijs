import Thead from "../../Core/Thead";
import Tr from "../../Core/Tr";

export default class DataTableHead {
    head: any;
    tr: any;
    constructor(ths?: Array<any>) {
        this.tr = Tr({
            style:"background-color:#ccc",
            children: ths
        })
        this.head = Thead({
            children: [
                this.tr
            ]
        })
    }

    render(){
        return this.head
    }

    addTh(th: any) {
        this.tr.appendChild(th)
    }
}