import { createStore } from 'redux';
import { StatefulWidget } from '../../framework/tikiti/index';
import Div from '../../framework/core/Div';
import TextView from '../../framework/core/TextView';

var initialState = {
  value: 0
}

function counter(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        value: state.value + 1,
      }
    case 'DECREMENT':
      return {
        ...state,
        value: state.value - 1,
      }
    default:
      return state
  }
}

let store = createStore(counter)

export function connect(state) {
  //console.log("Called...")
  return (Widget) => {
    return () => Widget({ store, state: store.getState() })
  }
}

export class ReduxWrapper extends StatefulWidget {
  constructor(props) {
    super()
    this.props = props
    this.state = {}
    //store = createStore(this.props.reducer)
    return this.connect();
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({ ...store.getState() })
      console.log(this.render())
    })
  }

  render() {
    return Div({
      children: [
        TextView("Counter " + this.state.value),
        this.props.Main
      ]
    })
  }
}


