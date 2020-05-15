import Aside from "../../core/Aside"
import DrawerType from "./DrawerTypes"
import Div from "../../core/Div";


type drawerType = DrawerType.DISMISSIBLE | DrawerType.MODAL | DrawerType.PERMANENT
let currentState: boolean = true;

export default ({ type, action, header, open }: { type: drawerType, action: any, header: any, open: boolean }) => {

    // if (document.getElementById("aside-menu")) {
    //     // if(currentState != open){
    //     //     setTimeout(() => _toggleDrawer(open), 1)
    //     // }
    //     // currentState = open
    //      setTimeout(() => _toggleDrawer(open), 10)
    // } else {
    //     currentState = open;
    //     initDrawer(open)
    // }
    //initDrawer(true)

    return Aside({
        id: 'aside-menu',
        class: type || DrawerType.PERMANENT,
        children: [
            header || null,
            Div({
                class: "mdc-drawer__content",
                children: [action || null]
            })
        ]
    })
}

//@ts-ignore
import { MDCDrawer } from "@material/drawer";
let drawer: any;

function initDrawer(open: boolean) {
    document.addEventListener('DOMContentLoaded', (_) => {
        drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
        drawer.open = open
    })
}

function _toggleDrawer(open: boolean) {
    drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
    //drawer.open = currentState;
    console.log(`drawer.open = ${drawer.open} open = ${open}`)
    if (drawer.open != open) {
        drawer.open = open;
        currentState = open
    }
    //drawer.open = !drawer.open;
    // console.log("_toggleDrawer = "+drawer.open)
}


export const toggleDrawer = () => {
    drawer.open = !drawer.open;
    console.log(drawer.open)
}
