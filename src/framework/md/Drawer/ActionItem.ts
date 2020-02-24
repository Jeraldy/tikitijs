import TextView from "../../core/TextView"
import Link from "../../core/Link"
import I from "../../core/I"
import Span from "../../core/Span"
import Hr from "../../core/Hr"

export default ({ icon, label, onclick }:
    { icon: string, label: string, onclick: (e: Event) => void }) => {
    return Link({
        class: "mdc-list-item",
        href: '#',
        children: [
            icon ? I({
                class: "material-icons mdc-list-item__graphic",
                'aria-hidden': "true",
                children: [
                    TextView(icon)
                ]
            }) : null,
            Span({
                class: 'mdc-list-item__text',
                children: [
                    TextView(label || '')
                ]
            })
        ],
        onclick: onclick || function () { }
    })
}

export function DrawerActionDivider() {
    return Hr({ class: "mdc-list-divider" })
}

