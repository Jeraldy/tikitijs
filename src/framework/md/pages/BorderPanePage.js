import BorderPane from "../../layouts/BorderPane"
import Div from "../../core/Div"
import Colors from "../../utils/Colors"

export default () => {
    return BorderPane({
        center: Div({
            style: {
                backgroundColor: Colors.blue_jeans,
                height: '100%',
                width: '100%'
            }
        }),
        top: Div({
            style: {
                backgroundColor: Colors.acid_green,
                height: '50px',
                width: '100%'
            }
        }),
        bottom: Div({
            style: {
                backgroundColor: Colors.arylide_yellow,
                height: '50px',
                width: '100%'
            }
        }),
        left: Div({
            style: {
                backgroundColor: Colors.arylide_yellow,
                height: '100%',
                width: '100px'
            }
        }),
        right: Div({
            style: {
                backgroundColor: Colors.arylide_yellow,
                height: '100%',
                width: '100px'
            }
        })
    })
}