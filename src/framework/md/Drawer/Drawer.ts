import Aside from "../../core/Aside"
import DrawerType from "./DrawerTypes"
import Div from "../../core/Div";
import '../style.scss';

type drawerType = DrawerType.DISMISSIBLE | DrawerType.MODAL | DrawerType.PERMANENT

export default ({ type, action, header }: {
    type: drawerType, action: any, header: any
}) => {
    return Aside({
        id: 'aside-menu',
        class: type || DrawerType.PERMANENT,
        children: [
            header || null,
            Div({
                class: "mdc-drawer__content",
                children: [
                    action || null
                ]
            })
        ]
    })
}

export function toggleDrawer() {
    document.getElementById("aside-menu")
        .classList.toggle('mdc-drawer--open');
}