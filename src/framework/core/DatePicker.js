import Node from "./Node";

export default (props) => {
    props.type = 'date'
    return Node(props, 'input');
}