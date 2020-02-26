import Div from "../core/Div"
import Size from "../utils/Size"

export default () => {
    return Div({
        style: {
            height: Size._1px,
            backgroundColor: '#e0e0e0',
            width: '100%'
        }
    })
}