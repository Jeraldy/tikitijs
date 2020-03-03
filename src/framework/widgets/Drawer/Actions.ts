import Nav from "../../core/Nav"


export default ({ items }: { items: Array<any> }) => {
    return Nav({
        class: 'mdc-list',
        children: items || []
    })
}