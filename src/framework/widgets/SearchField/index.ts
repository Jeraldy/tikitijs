import Div from "../../core/Div"
import Icon from "../Icon/index"
import TextField from "../TextField/index"
import './style.css';

export default () => {
    return Div({
        class: 'search-container',
        style: {
            float: 'right',
        },
        children: [
            Icon({
                name: 'search',
                style: {
                    position: 'relative',
                    top: '5px',
                    color: '#ccc'
                }
            }),
            TextField({
                placeholder: "Search",
                style: {
                    border: 'hidden',
                    height: '10px',
                    position: 'relative',
                    top: '-5px'
                },
            }),
        ]
    })
}