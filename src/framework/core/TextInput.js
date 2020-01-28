import Node from "./Node";

export default (props) => {
    props.type = 'text'
    return Node(props, 'input');
}