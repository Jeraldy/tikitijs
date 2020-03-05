import Button from "../../core/Button"
import TextView from "../../core/TextView"


export default ({ icon, props }: { icon: string, props?: any }) => {
    return Button({
        class: "mdc-icon-button material-icons mdc-top-app-bar__action-item--unbounded",
        children: [
            TextView(icon)
        ],
        ...props
    })
}

