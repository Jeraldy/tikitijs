import Div from "../Core/Div"
import Header from "../Core/Header"
import { TopBarEndActions, TopBarStartActions } from "./BarActions"

interface Params {
    topBarEndActions?: TopBarEndActions,
    topBarStartActions?: TopBarStartActions
}

export default class TopBar {
    node: any;
    constructor(params?: Params) {
        this.node = Header({
            class: "mdc-top-app-bar mdc-top-app-bar--dense",
            id: "app-bar",
            style: "background-color: #FFFFFF;box-shadow: 0 3px 3px -3px rgba(0,0,0,.2);color:black",
            children: [
                Div({
                    class: "mdc-top-app-bar__row",
                    children: [
                        params ? params.topBarStartActions || null : null,
                        params ? params.topBarEndActions || null : null
                    ]
                })
            ]
        })
        return this.node;
    }
}
