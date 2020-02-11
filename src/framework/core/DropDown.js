import Node from "./Node";

export default (props) => {
    var value = props.value
    if (value) {
        delete props.value
        var node = Node(props, 'select')
        node.value = value
        return node
    }
    return Node(props, 'select');
}