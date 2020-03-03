import Header from "../../core/Header"
import Div from "../../core/Div"
import BarType from "./AppBarType"
import Size from "../../utils/Size";

type _BarType = BarType.DENSE | BarType.FIXED | BarType.PROMINENT
    | BarType.PROMINENT_DENSE | BarType.SHORT | BarType.SHORT_COLLAPSED
    | BarType.STANDARD;

export default ({ barType, children }: { barType: _BarType, children: Array<any> }) => {
    return Header({
        class: barType || BarType.STANDARD,
        id: "app-bar",
        children: [
            Div({ class: cls, children: children || [] })
        ],
        style: {
            backgroundColor: '#ff6600',
            paddingRight: Size._250px
        }
    })
}

const cls = "mdc-top-app-bar__row"