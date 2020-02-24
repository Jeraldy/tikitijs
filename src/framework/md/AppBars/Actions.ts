import Section from "../../core/Section"
import Alignment from "./ActionAlignment"

export default ({ items, align }: { items: Array<any>, align: Alignment.START | Alignment.END }) => {
    return Section({
        class: align || Alignment.END,
        children: [
            ...items || []
        ]
    })
}