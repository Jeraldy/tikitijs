import { StatefulWidget } from "../../tikiti/index";
import Button from "../../ui/Button";
import { decrement } from '../actions/index';
import { updateState } from '../store/index';

class Descrement extends StatefulWidget {
    constructor() {
        super()
        this.state = { value: 0 }
        return this.connect()
    }

    mapStoreToState(state) {
        return { value: state.counter.value }
    }

    componentDidMount() {
        updateState(this)
    }

    render() {
        return Button({
            label: 'Decrement - ' + this.state.value,
            onclick: () => decrement()
        })
    }
}

export default Descrement;