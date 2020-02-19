import Div from "./framework/core/Div";
import TextView from "./framework/core/TextView";
import { Tikiti, StatefulWidget } from "./framework/tikiti/index";
import Button from "./framework/core/Button";
import TextInput from "./framework/core/TextInput";

class App extends StatefulWidget {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      value: ''
    }
    this.handleChange = this.handleChange.bind(this)
    return this.connectedCallBack();
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  addTodo() {
    if (this.state.value) {
      this.setState({
        todos: [...this.state.todos, this.state.value],
        value: ''
      })
    }
  }

  removeTodo(v) {
    this.setState({
      todos: this.state.todos.filter(value => value != v)
    })
  }

  todo(v) {
    return Div({
      id: Math.random(),
      children: [
        TextView(v),
        Button({
          onclick: () => this.removeTodo(v),
          children: [
            TextView("x")
          ]
        })
      ]
    })
  }

  render() {
    var { todos } = this.state
    const todoList = []

    todos.forEach((v) => {
      todoList.push(this.todo(v))
    })

    return Div({
      children: [
        Div({
          children: [
            TextInput({
              onchange: this.handleChange,
              value: this.state.value
            }),
            Button({
              onclick: () => this.addTodo(),
              children: [
                TextView("Add")
              ]
            })
          ]
        }),
        ...todoList
      ]
    })
  }
}


Tikiti.Init(new App());
