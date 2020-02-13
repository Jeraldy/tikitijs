import Nav from "../core/Nav"
import UnorderedList from "../core/UnorderedList"

export default (props: any) => {
    return Nav({
        class: 'menu',
        children: [
            UnorderedList({ ...props})
        ]
    })
}