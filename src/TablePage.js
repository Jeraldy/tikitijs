import { StatefulWidget } from "./framework/tikiti/index";
import DataTable from "./framework/ui/DataTable";
import axios from 'axios';
import Button from "./framework/ui/Button";
import Icon from "./framework/ui/Icon";
import SIZE from "./framework/utils/Size";
import Menu, { toggleMenu } from "./framework/md/Menu/Menu";
import Div from "./framework/core/Div";
import MenuItem  from "./framework/md/Menu/MenuItem";

class TablePage extends StatefulWidget {
    constructor(props) {
        super()
        this.state = {
            data: [
                [1, 'Jeraldy Deus', 'Something', 'qweq', 'eqweqw', '53484', this.action(1)],
                [2, 'Jeraldy James', 'Something', 'qweq', 'eqweqw', '53484', this.action(2)],
                [3, 'Jeraldy Khamis', 'Something', 'qweq', 'eqweqw', '53484', this.action(3)],
                [4, 'Jeraldy1 Said', 'Something', 'qweq', 'eqweqw', '53484', this.action(4)],
                [5, 'Jeraldy2 Deus', 'Something', 'qweq', 'eqweqw', '53484', this.action(5)],
                [6, 'Jeraldy3 James', 'Something', 'qweq', 'eqweqw', '53484', this.action(6)],
                [7, 'Jeraldy4 Khamis', 'Something', 'qweq', 'eqweqw', '53484', this.action(7)],
                [8, 'Jeraldy5 Said', 'Something', 'qweq', 'eqweqw', '53484', this.action(8)],
                [9, 'Jeraldy6 Deus', 'Something', 'qweq', 'eqweqw', '53484', this.action(9)],
                [10, 'Jeraldy7 James', 'Something', 'qweq', 'eqweqw', '53484', this.action(10)],
                [11, 'Jeraldy8 Khamis', 'Something', 'qweq', 'eqweqw', '53484', this.action(11)],
                [12, 'Jeraldy9 Said', 'Something', 'qweq', 'eqweqw', '53484', this.action(12)]
            ]
        }
        // this.generateData()
        return this.connect()
    }

    componentDidMount() {
        //this.generateData()
    }

    removeFromTable(id) {
        this.setState({
            data: this.state.data.filter(a => a[0] != id)
        })
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
        return Div({
            id,
            class: 'mdc-menu-surface--anchor',
            children: [
                Button({
                    icon: Icon({ name: 'more_vert', style: { color: 'gray' } }),
                    onclick: () => toggleMenu(id),
                    style: {
                        width: 'auto',
                        backgroundColor: 'transparent',
                        border: 'none'
                    }
                }),
                Menu({
                    id,
                    menuItems: [
                        MenuItem({ label: 'Item 1 - ' + id, }),
                        MenuItem({ label: 'Item 2', }),
                        MenuItem({ label: 'Item 2', })
                    ]
                })
            ],
        })
    }

    render() {
        return DataTable({
            titles: [
                { title: '#', style: { width: SIZE._10px } },
                { title: 'NAME' },
                { title: 'USERNAME' },
                { title: 'WEBSITE' },
                { title: 'PHONE' },
                { title: 'EMAIL' },
                { title: '', style: { width: SIZE._2px } }
            ],
            data: this.state.data
        })
    }
}

export default TablePage