import Div from "../Core/Div";
import './style.css';
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import Body from "./Body";

interface Params {
    sideBar?: SideBar,
    topBar?: TopBar,
    body?: Body
}

export default (params?: Params) => {
    return Div({
        children: [
            params.sideBar || null,
            params.topBar || null,
            params.body || null
        ]
    })
}

