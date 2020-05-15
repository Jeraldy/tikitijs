import Node from "./Node";

export default (props) => {
    props.type = 'radio'
    props.name = props.group || ''
    delete props.group
    props.checked = props.controller == props.value
    if (!props.checked) { delete props.checked }
    delete props.controller
    return Node(props, 'input');
}
