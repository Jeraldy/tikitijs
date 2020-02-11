import Div from "./framework/core/Div";
import Tikiti from "./framework/tikiti/index";
import Button from "./framework/ui/Button";
import CheckBox from "./framework/ui/CheckBox";
import DropDown from "./framework/ui/DropDown";
import DropDownItem from "./framework/core/DropDownItem";
import FileField from "./framework/ui/FileField";
import RadioButton from "./framework/ui/RadioButton";
import RadioGroup from "./framework/ui/RadioGroup";
import TextArea from "./framework/ui/TextArea";
import TextField from "./framework/ui/TextField";
import ListView from "./framework/ui/ListView";
import ListItem from "./framework/ui/ListItem";
import TextView from "./framework/core/TextView";
import DataTable from "./framework/ui/DataTable";
import axios from 'axios';

class App extends Tikiti {
  constructor() {
    super()
    this.state = {
      checked: true,
      dropValue: 'F',
      gender: 'F',
      file: '',
      data: []
    }
    return this.connect();
  }

  componentDidMount() {
    this.generateData()
  }

  async generateData() {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    var data = []
    response.data.forEach((row) => {
      data.push([
        row.id,
        row.name,
        row.username,
        row.website,
        row.phone,
        row.email,
        this.action(row.id)
      ])
    });
    this.setState({ data })
  }

  action(id) {
    return Button({
      label: 'X',
      onclick: () => this.removeFromTable(id),
      style: {
        width: '20px',
        height: '20px'
      }
    })
  }

  removeFromTable(id) {
    this.setState({
      data: this.state.data.filter(a => a[0] != id)
    })
  }

  toggle() {
    this.setState({
      checked: !this.state.checked
    })
  }

  handleChange(e) {
    this.setState({
      dropValue: e.target.value
    })
  }

  btnClicked() {
    console.log("Clicked...")
  }

  render() {
    return Div({
      children: [

        Button({
          label: "Button",
          onclick: () => this.btnClicked()
        }),

        CheckBox({
          onclick: () => this.toggle(),
          checked: this.state.checked
        }),

        DropDown({
          value: this.state.dropValue,
          onchange: (e) => this.handleChange(e),
          children: [
            DropDownItem({ value: 'M', label: 'Male' }),
            DropDownItem({ value: 'F', label: 'Female' })
          ]
        }),

        // FileField({
        //   onchange: (e) => {
        //     this.setState({
        //       file: e.target.value
        //     })
        //   }
        // }),

        RadioGroup({
          onchange: (e) => {
            this.setState({
              gender: e.target.value
            })
          },
          children: [
            RadioButton({
              group: 'gender',
              value: 'M',
              controller: this.state.gender
            }),
            RadioButton({
              group: 'gender',
              value: 'F',
              controller: this.state.gender
            })
          ]
        }),

        TextArea({
          onkeyup: (e) => { console.log(e.target.value) }
        }),

        TextField({
          onkeyup: (e) => { console.log(e.target.value) }
        }),

        ListView({
          children: [
            ListItem({
              children: [
                TextView("Item 1"),
              ]
            }),
            ListItem({
              children: [
                TextView("Item 2")
              ]
            }),
            ListItem({
              children: [
                TextView("Item 3")
              ]
            })
          ]
        }),

        DataTable({
          titles: [
            { title: '#', style: { width: '10px' } },
            { title: 'Name' },
            { title: 'Username' },
            { title: 'Website' },
            { title: 'Phone' },
            { title: 'Email' },
            { title: '', style: { width: '30px' } }
          ],
          data: this.state.data
        })

      ]
    })

  }
}


Tikiti.Init(new App());
