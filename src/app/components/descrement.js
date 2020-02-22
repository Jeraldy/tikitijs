import { actions } from '../reducers/counter';
import { updateState, dispatch } from '../store';
import { StatefulWidget } from '../../framework/tikiti/index';
import Button from '../../framework/ui/Button';
const { decrement } = actions

class Descrement extends StatefulWidget {
    constructor() {
        super()
        this.state = {}
        return this.connect()
    }

    mapStoreToState(state) {
        return { ...state.counter, ...state.data }
    }

    componentDidMount() {
        updateState(this)
    }

    render() {
        return Button({
            label: 'Decrement - ' + this.state.isLoading,
            onclick: () => dispatch(decrement())
        })
    }
}

export default Descrement;