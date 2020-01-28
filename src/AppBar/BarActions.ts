import Section from "../Core/Section";
import Button from "../Core/Button";
import TextView from "../Core/TextView";
import Span from "../Core/Span";
import _Node from '../Core/Node';

interface Params {
    children?: Array<any>,
    props?: {}
}

export class TopBarEndActions {
    constructor(params?: Params) {
        return Section({
            class: "mdc-top-app-bar__section mdc-top-app-bar__section--align-end",
            style: "color:black",
            children: [
                ...params.children || []
            ],
            ...params.props
        })
    }
}

interface _Params {
    children?: Array<Node>,
    title?: string,
    props?: {}
}

export class TopBarStartActions {
    constructor(params?: _Params) {
        return Section({
            class: "mdc-top-app-bar__section mdc-top-app-bar__section--align-start",
            children: [
                Button({
                    class: "material-icons mdc-top-app-bar__navigation-icon mdc-icon-button",
                    style: "color:black",
                    children: [
                        TextView("menu"),
                    ]
                }),
                params.title ? Span({
                    class: "mdc-top-app-bar__title",
                    children: [
                        TextView(params.title)
                    ]
                }) : null,
                ...params.children || []
            ],
            ...params.props
        })
    }
}


interface __Params {
    icon: string,
    props?: {}
}
export class ActionItem {
    constructor(params: __Params) {
        return Button({
            class: "mdc-icon-button material-icons mdc-top-app-bar__action-item--unbounded",
            children: [
                TextView(params.icon)
            ],
            ...params.props
        })
    }
}