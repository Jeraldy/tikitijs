import UnorderedList from "../../core/UnorderedList"

export default ({ listItems }: { listItems: Array<any> }) => {
    return UnorderedList({
        class: "mdc-list",
        children: [
            ...listItems || []
        ]
    })
}
