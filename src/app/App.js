import Increment from "./components/increment";
import Descrement from "./components/descrement";
import { StatefulWidget } from "../framework/tikiti/index";
import Div from "../framework/core/Div";
import { fetchUsers } from './api/index';

class App extends StatefulWidget {
    constructor() {
        super()
        return this.connect()
    }

    componentDidMount() {
        fetchUsers()
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