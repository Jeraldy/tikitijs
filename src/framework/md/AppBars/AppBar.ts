import Header from "../../core/Header"
import Div from "../../core/Div"
import BarType from "./AppBarType"
import '../style.scss';

type _BarType = BarType.DENSE | BarType.FIXED | BarType.PROMINENT
    | BarType.PROMINENT_DENSE | BarType.SHORT | BarType.SHORT_COLLAPSED
    | BarType.STANDARD;

export default ({ barType, children }: { barType: _BarType, children: Array<any> }) => {
    return Header({
        class: barType || BarType.STANDARD,
        children: [
            Div({
                class: cls,
                children: [
                    ...children || [],
                ]
            })
        ],
        style: {
            backgroundColor: '#ff6600'
        }
    })
}

const cls = "mdc-top-app-bar__row"