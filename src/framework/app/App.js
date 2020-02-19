import { StatefulWidget } from "../tikiti/index";
import Div from "../core/Div";
import Increment from "./components/increment";
import Descrement from "./components/descrement";

class App extends StatefulWidget {
    constructor() {
        super()
        return this.connect()
    }

    render() {
        return Div({
            children: [
                new Increment(),
                new Descrement()
            ]
        })
    }
}

export default App;