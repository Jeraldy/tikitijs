import Div from "../Core/Div";

export default class Body {
    constructor(params?: {}) {
        return Div({
            class: 'new-wrapper',
            ...params
        })
    }
}