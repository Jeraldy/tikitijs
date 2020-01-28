import Div from "../Core/Div";
import './bootstrap.css';

interface GridParams {
    children?: Array<GridCell>,
    props?: {}
}

export class Grid {
    node: any;
    constructor(params?: GridParams) {
        var { props, children } = { ...params }
        //@ts-ignore
        props.class ? props.class += " row" : props.class = "row";
        this.node = Div({
            children: [...children || []],
            ...props
        });
        return this.node;
    }
}

interface CellParams {
    children: Array<Node>,
    props?: {}
}

export class GridCell {
    constructor(params?: CellParams) {
        return Div({
            class: "col-md-6",
            ...params.props,
            children: [...params.children || []]
        })
    }
}