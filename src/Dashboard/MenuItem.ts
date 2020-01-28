import ListItem from "../Core/ListItem";
import Link from "../Core/Link";
import Span from "../Core/Span";
import I from "../Core/I";
import TextView from "../Core/TextView";

interface Params {
    title: string,
    icon: string,
    route?: string
}

export default class MenuItem {
    constructor(params: Params) {
        return ListItem({
            children: [
                Link({
                    href: params.route || "#",
                    children: [
                        TextView(params.title)
                    ]
                }),
                Span({
                    class: "icon",
                    children: [
                        I({ class: params.icon })
                    ]
                })
            ]
        })
    }
}