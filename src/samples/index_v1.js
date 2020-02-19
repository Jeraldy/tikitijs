import Scaffold from "../framework/scaffold/index";
import Div from "../framework/core/Div";
import TextView from "../framework/core/TextView";
import Button from "../framework/core/Button";
import Tikiti from "../framework/tikiti/index";

class App extends Tikiti {
  constructor(props) {
    super(props)
    this.state = {
      page: this.currentPage(3),
      name: "blue"
    }
    this.handleChange = this.handleChange.bind(this);
    return this.connectedCallBack(this);
  }

  handleChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  currentPage(key) {
    switch (key) {
      case 1:
        return Div({
          children: [
            TextView("Page 1"),
            Div({
              children: [
                TextView("Some content")
              ]
            })
          ]
        })
      case 2:
        return Div({
          children: [
            TextView("Page 2")
          ]
        })
      case 3:
        return new Scaffold()
      default:
        break;
    }
  }

  switchPage(key) {
    this.setState({
      page: this.currentPage(key)
    })
  }

  render() {
    return Div({
      children: [
        Div({
          children: [
            Button({
              onclick: () => this.switchPage(1),
              children: [
                TextView("Page 1")
              ]
            }),
            Button({
              onclick: () => this.switchPage(2),
              children: [
                TextView("Page 2")
              ]
            }),
            Button({
              onclick: () => this.switchPage(3),
              children: [
                TextView("Page 3")
              ]
            })
          ]
        }),
        Div({
          children: [
            this.state.page
          ]
        })
      ]
    })
  }
}


document.getElementById("root").appendChild(new App());
