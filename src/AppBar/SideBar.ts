import Div from "../Core/Div";
import Menu from "./Menu";
import Aside from "../Core/Aside";
import { SideBarType } from "./Constants";
import init from "./init";

interface Params {
    title?: string,
    menu?: any,
    type: string
}

export default class SideBar {
    constructor(params: Params) {
        if (params.type !== SideBarType.Permanent) { init() }
        return Aside({
            class: params.type,
            children: [
                Div({
                    class: "mdc-drawer__content",
                    children: [
                        params.menu || null
                    ]
                })
            ]
        })
    }
}
