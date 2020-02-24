import ListItem from "../../core/ListItem"
import TextView from "../../core/TextView";


export default (
    { label, onclick }: { label: string, onclick: (e: Event) => void },
) => {

    return ListItem({
        class: "mdc-list-item",
        role: "menuitem",
        children: [
            TextView(label || '')
        ],
        onclick: onclick || function(){}
    })
}