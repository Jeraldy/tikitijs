import Div from "../../core/Div"
import TextView from "../../core/TextView"
import GridContainer from "../../widgets/Grid/GridContainer"
import Grid from "../../widgets/Grid"
import GridCell from "../../widgets/Grid/GridCell"
import Size from "../../utils/Size"
import Hr from "../../core/Hr"
import TextField from "../../widgets/TextField"
import Card from "../../widgets/Card"

export default () => {
    return Card({
        children: [
            GridContainer({
                grid: Grid({
                    cells: [
                        GridCell({ children: [DummyCard('CELL 1'),DummyCard('CELL x')] }),
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
            TextView(name),
            TextField({
                style: {
                    height: Size._20px,
                    width: '90%',
                }
            }),
        ]
    })
}