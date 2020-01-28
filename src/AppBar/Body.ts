import Div from "../Core/Div";
import Main from "../Core/Main";

export default class Body {
    constructor(params?: {}) {
        return Main({
            class: "main-content",
            id: "main-content",
            children: [
                Div({
                    class: 'mdc-top-app-bar--fixed-adjust',
                    ...params
                })
            ]
        })
    }
}