import UnorderedList from "../Core/UnorderedList";
import MenuItem from "./MenuItem";

interface Params {
    menuItems?: Array<MenuItem>
}

export default class Menu {
    constructor(params?: Params) {
        return UnorderedList({
            class: "menu-dropdown",
            children: params.menuItems || []
        })
    }
}