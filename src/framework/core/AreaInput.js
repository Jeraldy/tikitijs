import Node from "./Node";

export default (props) => {
    props.ref = Math.random().toString(36).substring(7).toString();
    return Node(props, 'textarea');
}