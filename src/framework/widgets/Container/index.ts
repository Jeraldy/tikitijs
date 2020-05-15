import Div from "../../core/Div";
import * as CSS from '../../../../node_modules/csstype/index';

const _style: CSS.Properties = {};

export default ({ items, style }: { items: Array<Node>, style: typeof _style }) => {
    return Div({ children: items, style })
}