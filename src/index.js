import Chungwa from "./framework/chungwa/index";
import Scaffold from "./framework/scaffold/index";

class App extends Chungwa {
  constructor(props) {
    super(props)
    return this.connectedCallBack(this);
  }

  render() {
    return new Scaffold()
  }
}


document.body.appendChild(new App());
