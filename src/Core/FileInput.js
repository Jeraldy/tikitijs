import Node from "./Node";

export default (props) => {
    props.type = 'file'
    return Node(props, 'input');
}