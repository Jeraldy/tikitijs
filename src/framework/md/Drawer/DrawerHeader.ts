import Div from "../../core/Div"
import H3 from "../../core/H3"
import TextView from "../../core/TextView"
import H6 from "../../core/H6"

export default (props: any) => {
    return Div({
        class: "mdc-drawer__header",
        ...props
    })
}

export function DrawerHeaderTitle(title: string) {
    return H3({
        class: "mdc-drawer__title",
        children: [
            TextView(title || '')
        ]
    })
}

export function DrawerHeaderSubTitle(title: string) {
    return H6({
        class: "mdc-drawer__subtitle",
        children: [
            TextView(title || '')
        ]
    })
}