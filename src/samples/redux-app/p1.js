import Div from "../../framework/core/Div"
import Button from "../../framework/ui/Button"
import { connect } from './store';

const Increment = ({ store }) => {
    //console.log("Called....")
    return Div({
        children: [
            Button({
                label: 'Increment',
                onclick: () => {
                    store.dispatch({ type: 'INCREMENT' })
                }
            })
        ]
    })
}



const mapStateToProps = (state) => {
    return { ...state }
}

export default connect(mapStateToProps)(Increment)
