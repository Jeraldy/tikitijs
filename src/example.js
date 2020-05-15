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

    // componentDidMount() {
    //     setInterval(() => {
    //         this.setState({
    //             counter: this.state.counter + 1
    //         })
    //     }, 1000);
    // }

    handleChange(e) {
        this.setState({ value: e.target.value }, e)
    }

    addTodo() {
        if (this.state.value) {
            this.setState({
                todos: [...this.state.todos, this.state.value],
                value: ''
            })
        }
    }

    render() {
        return Div({
            children: [
                Row({
                    children: [
                        TextInput({
                            value: this.state.value,
                            onkeyup: (e) => this.handleChange(e),
                            id: 'input-id'
                        }),
                        Button({
                            children: [TextView(" Add Todo")],
                            onclick: () => this.addTodo()
                        })
                    ]
                }),
                UnorderedList({
                    children: this.state.todos.map((todo) => ListItem({ children: [TextView(todo)] }))
                }),
                Button({
                    children: [TextView("Toggle Width-"+this.state.counter)],
                    onclick: () => this.setState({
                        height: this.state.height == Size._200px ? Size._20px : Size._200px,
                        //class: this.state.class == '' ? 'animate' : ''
                    })
                }),
                Div({
                    //class: this.state.class,
                    style: {
                        width: Size._200px,
                        height: this.state.height,
                        backgroundColor: Colors.acid_green,
                        transition: 'height .3s'
                    },
                    children: [
                        Div({ children: [TextView("Item 1")] }),
                        Div({ children: [TextView("Item 2")] }),
                        Div({ children: [TextView("Item 3")] })
                    ]
                }),
            ]
        })
    }
}

export default App;

