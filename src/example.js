import { StatefulWidget } from "./framework/tikiti/index";
import TextView from "./framework/core/TextView";
import Row from "./framework/layouts/Row";
import Button from "./framework/core/Button";
import UnorderedList from "./framework/core/UnorderedList";
import Div from "./framework/core/Div";
import TextInput from "./framework/core/TextInput";
import ListItem from "./framework/core/ListItem";
import Size from "./framework/utils/Size";
import Colors from "./framework/utils/Colors";
import './index.css';
import DummyPage from "./dummyPage";

class App extends StatefulWidget {
    constructor() {
        super()
        this.state = {
            todos: [],
            value: '',
            height: Size._200px,
            class: '',
            counter: 0
        }
        return this.connect()
    }

    handleChange(e) {
        this.setState({ value: e.target.value })
    }

    addTodo() {
        if (this.state.value) {
            this.setState({
                todos: [...this.state.todos, this.state.value],
                value: ''
            })
        }
    }

    toggleHeight() {
        this.setState({
            height: this.state.height == Size._200px ? Size._20px : Size._200px,
        })
    }

    render() {
        return Div({
            children: [
                Row({
                    children: [
                        TextInput({
                            value: this.state.value,
                            onkeyup: (e) => this.handleChange(e),
                        }),
                        Button({
                            children: [TextView("+")],
                            onclick: () => this.addTodo()
                        })
                    ]
                }),
                UnorderedList({
                    children: this.state.todos.map((todo) => ListItem({ children: [TextView(todo)] }))
                }),
                // Button({
                //     children: [TextView("Toggle Width")],
                //     onclick: () => this.toggleHeight()
                // }),
                DummyPage({
                    height: this.state.height,
                    toggleHeight: () => this.toggleHeight()
                })
            ]
        })
    }
}

export default App;

