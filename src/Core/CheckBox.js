import Node from "./Node";

export default (props) => {
    props.type = 'checkbox'
    return Node(props, 'input');
}