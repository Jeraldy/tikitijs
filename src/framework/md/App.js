import { StatefulWidget } from "../tikiti/index";
import Drawer, { toggleDrawer } from "./Drawer/Drawer";
import DrawerType from "./Drawer/DrawerTypes";
import Scaffold from "./Scaffold/Scaffold";
import Div from "../core/Div";
import DrawerHeader, { DrawerHeaderSubTitle } from "./Drawer/DrawerHeader";
import Image from "../core/Image";
import SIZE from "../utils/Size";
import TablePage from "../../TablePage";
import FormPage from "./pages/FormPage";
import SideMenu from "./pages/SideMenu";
import ToolBar from "./pages/ToolBar";
import LayoutPage from "./pages/LayoutPage";
import GridPage from "./pages/GridPage";
import AnimationPage from "./pages/AnimationPage";
import StepperPage from "./pages/StepperPage";
import BorderPanePage from "./pages/BorderPanePage";
import DialogPage from "./pages/DialogPage";

class App extends StatefulWidget {
    constructor() {
        super()
        this.state = { key: 2, open: true }
        return this.connect()
    }

    getActivePage(key) {
        switch (key) {
            case 1:
                return new TablePage()
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
                open: this.state.open,
                header: DrawerHeader({
                    children: [
                        this.avator(),
                        DrawerHeaderSubTitle("deusjeraldy@gmail.com")
                    ]
                }),
                type: DrawerType.PERMANENT,
                action: SideMenu({
                    goToPage: (key) => this.goToPage(key),
                    key: this.state.key
                })
            }),
            appBar: ToolBar({
                toggleNav: () => this.toggleNav()
            }),
            body: Div({
                style: { padding: SIZE._20px , height: '500px'},
                children: [
                    this.getActivePage(this.state.key)
                ],

            })
        })
    }
}


export default App;