import { StatefulWidget, Tikiti } from "./framework/tikiti/index";
import Div from "./framework/core/Div";
import Increment from './samples/redux-app/p1';
import Decrement from './samples/redux-app/p2';
import TextView from "./framework/core/TextView";
import { ReduxWrapper } from "./samples/redux-app/store";

class App extends StatefulWidget {
  constructor(props) {
    super()
    // this.store = props.store
    this.state = { value: 0 }
    return this.connect();
  }

  componentDidMount() {
    // this.store.subscribe(() => this.setState({
    //   value: store.getState()
    // }))
  }

  render() {
    return Div({
      children: [
        TextView(`Value ${this.state.value}`),
        Increment(),
        Decrement()
      ]
    })
  }
}

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

Tikiti.Init(
  new ReduxWrapper({
    reducer: counter,
    Main: new App()
  })
);

