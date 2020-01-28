import MenuItem from "./MenuItem";
import Div from "../Core/Div";

interface Params {
    menuItems?: Array<MenuItem>
}

export default class Menu {
    constructor(params?: Params) {
        return Div({
            class: "mdc-list",
            children: params.menuItems || []
        })
    }
}