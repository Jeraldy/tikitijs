import { StatefulWidget } from "../tikiti/index";
import Drawer from "./Drawer/Drawer";
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
import ListPage from "./pages/ListPage";

class App extends StatefulWidget {
    constructor() {
        super()
        this.state = { key: 2 }
        return this.connect()
    }

    getActivePage(key) {
        switch (key) {
            case 1:
                return new TablePage()
            case 2:
                return FormPage()
            case 3:
                return ListPage()
            default:
                break
        }
    }

    goToPage(key) {
        this.setState({ key })
    }

    avator() {
        return Image({
            src: 'https://www.moderatecontent.com/img/sample_face_3.jpg',
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
                header: DrawerHeader({
                    children: [this.avator(), DrawerHeaderSubTitle("deusjeraldy@gmail.com")]
                }),
                type: DrawerType.DISMISSIBLE,
                action: SideMenu({
                    goToPage: (key) => this.goToPage(key)
                })
            }),
            appBar: ToolBar(),
            body: Div({
                style: { padding: SIZE._20px },
                children: [
                    this.getActivePage(this.state.key)
                ]
            })
        })
    }
}


export default App;