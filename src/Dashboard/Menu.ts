import UnorderedList from "../Core/UnorderedList";
import MenuItem from "./MenuItem";

interface Params {
    menuItems?: Array<MenuItem>,
    props?: {}
}

export default class Menu {
    constructor(params?: Params) {
        var { props, menuItems } = { ...params };
        //@ts-ignore
        props.class ? props.class += " new-wrapper" : props.class = "new-wrapper";
        return UnorderedList({
            children: menuItems || [],
            ...props
        })
    }
}