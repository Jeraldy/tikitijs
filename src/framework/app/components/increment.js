import { StatefulWidget } from "../../tikiti/index";
import Button from "../../ui/Button";
import { increment } from '../actions/index';
import { updateState } from '../store/index';

class Increment extends StatefulWidget {
    constructor() {
        super()
        this.state = { value: 0, name: 'Increment' }
        return this.connect()
    }

    mapStoreToState(state) {
        return { value: state.counter.value }
    }

    componentDidMount() {
        updateState(this.mapStoreToState, this)
    }

    render() {
        return Button({
            label: `${this.state.name} ${this.state.value}`,
            onclick: () => increment()
        })
    }
}

export default Increment;