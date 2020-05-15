import { StatefulWidget } from "../tikiti/index";
import Drawer from '../widgets/Drawer/Drawer';
import Scaffold from "../widgets/Scaffold";
import Div from "../core/Div";
import DrawerHeader, { DrawerHeaderSubTitle } from "../widgets/Drawer/DrawerHeader";
import Image from "../core/Image";
import SIZE from "../utils/Size";
import FormPage from "./pages/FormPage";
import SideMenu from "./pages/SideMenu";
import ToolBar from "./pages/ToolBar";
import LayoutPage from "./pages/LayoutPage";
import GridPage from "./pages/GridPage";
import AnimationPage from "./pages/AnimationPage";
import StepperPage from "./pages/StepperPage";
import BorderPanePage from "./pages/BorderPanePage";
import DialogPage from "./pages/DialogPage";
import Colors from "../utils/Colors";
import Size from "../utils/Size";
import Table from "../widgets/Table/index";
import axios from 'axios';
import Menu, { toggleMenu } from "../widgets/Menu/Menu";
import MenuItem from "../widgets/Menu/MenuItem";
import ActionButton from '../widgets/Button/ActionButton'

class App extends StatefulWidget {
    constructor() {
        super()
        this.state = {
            key: 1,
            open: true,
            value: '',
            value1: '',
            data: [
                // [1, 'Jeraldy Deus', 'Something', 'qweq', 'eqweqw', '53484'],
                // [2, 'Jeraldy James', 'Something', 'qweq', 'eqweqw', '53484'],
                // [3, 'Jeraldy Khamis', 'Something', 'qweq', 'eqweqw', '53484'],
                // [4, 'Jeraldy1 Said', 'Something', 'qweq', 'eqweqw', '53484'],
                // [5, 'Jeraldy2 Deus', 'Something', 'qweq', 'eqweqw', '53484'],
                // [6, 'Jeraldy3 James', 'Something', 'qweq', 'eqweqw', '53484'],
                // [7, 'Jeraldy4 Khamis', 'Something', 'qweq', 'eqweqw', '53484'],
                // [8, 'Jeraldy5 Said', 'Something', 'qweq', 'eqweqw', '53484'],
                // [9, 'Jeraldy6 Deus', 'Something', 'qweq', 'eqweqw', '53484'],
                // [10, 'Jeraldy7 James', 'Something', 'qweq', 'eqweqw', '53484'],
                // [11, 'Jeraldy8 Khamis', 'Something', 'qweq', 'eqweqw', '53484'],
                // [12, 'Jeraldy9 Said', 'Something', 'qweq', 'eqweqw', '1000']
            ]
        }
        return this.connect()
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
        return Div({
            class: 'mdc-menu-surface--anchor',
            children: [
                ActionButton({
                    icon: 'more_vert',
                    onclick: () => toggleMenu(id),
                }),
                Menu({
                    id,
                    menuItems: [
                        MenuItem({ label: 'Details - ' + id }),
                        MenuItem({ label: 'Edit', }),
                        MenuItem({ label: 'Remove', }),
                        MenuItem({ label: 'Item x', })
                    ]
                })
            ],
        })
    }


    getActivePage(key) {
        switch (key) {
            case 1:
                return Table({
                    title: 'Customers',
                    titles: [
                        { title: '#', style: { width: SIZE._10px } },
                        { title: 'Name' },
                        { title: 'Username' },
                        { title: 'Website' },
                        { title: 'Phone' },
                        { title: 'Email' },
                        { title: '', style: { width: SIZE._2px }},
                    ],
                    data: this.state.data,
                    actions: [
                        ActionButton({ icon: "add" }),
                        //ActionButton({ icon: "more_vert" }),
                    ]
                })
            case 2:
                return FormPage()
            case 3:
                return new DialogPage()
            case 4:
                return GridPage()
            case 5:
                return LayoutPage()
            case 6:
                return AnimationPage()
            case 7:
                return new StepperPage()
            case 8:
                return BorderPanePage()
            default:
                break
        }
    }

    goToPage(key) {
        this.setState({ key })
    }

    toggleNav() {
        this.setState({
            open: !this.state.open
        })
        //toggleDrawer()
    }

    avator() {
        return Image({
            //src: 'https://www.moderatecontent.com/img/sample_face_3.jpg',
            style: {
                borderRadius: SIZE._100px,
                height: SIZE._40px,
                width: SIZE._40px
            }
        })
    }

    render() {
        return Scaffold({
            drawer: Drawer({
                //open: this.state.open,
                header: DrawerHeader({
                    children: [
                        //this.avator(),
                        DrawerHeaderSubTitle("deusjeraldy@gmail.com")
                    ]
                }),
                // type: DrawerType.DISMISSIBLE,
                action: SideMenu({
                    goToPage: (key) => this.goToPage(key),
                    key: this.state.key
                })
            }),
            appBar: ToolBar({
                //toggleNav: () => this.toggleNav()
            }),
            body: Div({
                style: {
                    padding: SIZE._20px,
                    paddingTop: SIZE._60px,
                    height: Size._100vh,
                    backgroundColor: Colors.body
                },
                children: [
                    // TextField({
                    //     onkeyup: (e) => this.setState({ value: e.target.value }, 'input1'),
                    //     value: this.state.value,
                    //     id: 'input1'
                    // }),
                    // TextField({
                    //     onkeyup: (e) => this.setState({ value1: e.target.value }, 'input2'),
                    //     value: this.state.value1,
                    //     id: 'input2'
                    // }),
                    this.getActivePage(this.state.key)
                ],
            })
        })
    }
}


export default App;