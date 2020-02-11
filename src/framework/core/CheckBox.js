import Node from "./Node";

export default (props) => {
    props.type = 'checkbox'
    if (!props.checked) { delete props.checked }
    return Node(props, 'input');
}