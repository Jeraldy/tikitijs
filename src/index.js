import Div from "./framework/core/Div";
import TextView from "./framework/core/TextView";
import Button from "./framework/core/Button";
import Chungwa from "./framework/chungwa/index";
import TextInput from "./framework/core/TextInput";

class MyComponent extends Chungwa {
  constructor() {
    super()
    this.state = { x: 0, name: "" };
    return this.connectedCallBack(this);
  }

  handleClick() {
    this.setState({
      x: this.state.x + 1
    })
  }

  handleChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  render() {
    return Div({
      children: [
        TextInput({
          onkeyup: (e) => this.handleChange(e),
          value: this.state.name
        }),
        Button({
          children: [
            TextView("Click Me - x:" + this.state.x),
          ],
          onclick: () => this.handleClick()
        }),
      ]
    })
  }
}


document.body.appendChild(new MyComponent());
