import Link from "../Core/Link";
import Span from "../Core/Span";
import I from "../Core/I";
import TextView from "../Core/TextView";

interface Params {
    title: string,
    icon: string,
    route?: string,
    props?: {}
}

export default class MenuItem {
    constructor(params: Params) {
        return Link({
            class: "mdc-list-item",
            href: "#",
            'aria-current': "page",
            children: [
                I({
                    class: "material-icons mdc-list-item__graphic",
                    'aria-hidden': "true",
                    children: [
                        TextView(params.icon)
                    ]
                }),
                Span({
                    class: "mdc-list-item__text",
                    children: [
                        TextView(params.title)
                    ]
                })
            ],
            ...params.props
        })
    }
}