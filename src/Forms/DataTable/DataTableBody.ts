import Tbody from "../../Core/Tbody";
import Tr from "../../Core/Tr";

export default class DataTableBody {
    body: any;
    tr: any;
    constructor(ths?: Array<any>) {
        this.body = Tbody({
            children: [
                ths ? Tr({ children: ths || null }) : null
            ]
        })
    }

    render() {
        return this.body
    }

    addTr(tr: any) {
        this.body.appendChild(tr)
    }
}
