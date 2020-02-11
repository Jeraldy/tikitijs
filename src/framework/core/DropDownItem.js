import Node from "./Node";
import TextView from "./TextView";

export default (props) => {
    props.children = [TextView(props.text || '')]
    delete props.text
    return Node(props, 'option');
}