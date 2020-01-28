import "./index.scss";
import Div from "../Core/Div";
import SideBar from "./SideBar";
import Body from "./Body";

interface Params {
    sideBar?: SideBar,
    topBar?: any,
    body?: Body
}

export default (params?: Params) => {
    if (params.sideBar) {
        document.body.appendChild(params.sideBar as unknown as Node)
    }
    return Div({
        class: "mdc-drawer-app-content",
        children: [
            params.topBar || null,
            params.body || null
        ]
    })
}

