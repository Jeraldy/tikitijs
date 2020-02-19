import Div from "../../framework/core/Div"
import Button from "../../framework/ui/Button"
import { connect } from './store';

const Decrement = ({ store, state }) => {
    return Div({
        children: [
            Button({
                label: 'Decrement - ' + state.value,
                onclick: () => {
                    store.dispatch({ type: 'DECREMENT' })
                }
            })
        ]
    })
}

const mapStateToProps = (state) => {
    return { ...state }
}

export default connect(mapStateToProps)(Decrement)
