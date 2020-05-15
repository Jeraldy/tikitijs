import Div from "../../core/Div"
import UnorderedList from "../../core/UnorderedList"
//@ts-ignore
import { MDCMenu } from '@material/menu';


export default ({ menuItems, id }: { menuItems: Array<any>, id: string }) => {
    initMenu(id)
    return Div({
        id: `menu-${id}`,
        class: 'mdc-menu mdc-menu-surface menu-' + id,
        children: [
            UnorderedList({
                id,
                class: "mdc-list",
                role: "menu",
                'aria-hidden': "true",
                'aria-orientation': "vertical",
                tabindex: "-1",
                children: menuItems || [],
                // style:{
                //     right: '0 !important',
                //     left: 'auto !important',
                // }
            })
        ]
    })
}

export function toggleMenu(id: string) {
    //@ts-ignore
    if (!window[`menu-${id}`].root_) { _initMenu(id) }
    //@ts-ignore
    window[`menu-${id}`].open = true;//!window[`menu-${id}`].open;
    //@ts-ignore
    console.log(window[`menu-${id}`].open)
}

function initMenu(id: string) {
    document.addEventListener("DOMContentLoaded", (_) => _initMenu(id));
}

function _initMenu(id: string) {
    if (document.querySelector(`.menu-${id}`)) {
        //@ts-ignore
        window[`menu-${id}`] = new MDCMenu(document.querySelector(`.menu-${id}`));
        //@ts-ignore
        window[`menu-${id}`].open = false;
    }
}