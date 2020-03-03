import Div from "../../core/Div"
import './style.css';


export default (props: any = {}) => {
    return Div({ class: 'card-1', ...props })
}