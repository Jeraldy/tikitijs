import Span from "../../core/Span"
import TextView from "../../core/TextView"

export default (title: string = '', props: any = {}) => {
    return Span({
        class: "mdc-top-app-bar__title",
        children: [TextView(title)],
        ...props
    })
}