import Div from "../../core/Div"
import TextView from "../../core/TextView"
import GridContainer from "../grid/GridContainer"
import Grid from "../grid/Grid"
import GridCell from "../grid/GridCell"
import Card from "../../ui/Card"
import TextField from "../../ui/TextField";
import Size from "../../utils/Size"
import Hr from "../../core/Hr"

export default () => {
    return Card({
        children: [
            GridContainer({
                grid: Grid({
                    cells: [
                        GridCell({ children: [DummyCard('CELL 1')] }),
                        GridCell({ children: [DummyCard('CELL 2')] }),
                        GridCell({ children: [DummyCard('CELL 3')] }),
                        GridCell({ children: [DummyCard('CELL 4')] }),
                        GridCell({ children: [DummyCard('CELL 1')] }),
                        GridCell({ children: [DummyCard('CELL 2')] }),
                        GridCell({ children: [DummyCard('CELL 3')] }),
                        GridCell({ children: [DummyCard('CELL 4')] }),
                    ]
                })
            }),
            Hr(),
            Div({ style: { height: Size._50px }, })
        ]
    })
}

function DummyCard(name) {
    return Div({
        style: {
            width: '100%',
            paddingRight: Size._18px
        },
        children: [
            TextView('First Name: '),
            TextField({
                style: {
                    height: Size._20px,
                    width: '90%',
                }
            }),
        ]
    })
}