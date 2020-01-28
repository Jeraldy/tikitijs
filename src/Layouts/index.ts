import Div from "../Core/Div";

export class Grid {
    constructor(cells: Array<GridCell>) {
        return Div({
            class: "mdc-layout-grid",
            children: [
                Div({
                    class: "mdc-layout-grid__inner",
                    children: [...cells]
                })
            ]
        })
    }
}

export class GridCell {
    constructor(children?: Array<any>) {
        return Div({
            class: "mdc-layout-grid__cell",children})
    }
}