import Div from "../core/Div";
import { StatefulWidget } from "../tikiti/index";
import "./index.css";
import SideNav from "./SideNav";
import MainPage from "./MainPage";

enum WIDTH {
    START = '50px',
    END = '250px'
}

export default class Scaffold extends StatefulWidget {

    constructor(props?: any) {
        super();
        this.state = { width: WIDTH.END, ...props }
        return this.connect();
    }


    toggle() {
        this.setState({
            width: this.state.width == WIDTH.START ? WIDTH.END : WIDTH.START
        })
    }

    render() {
        //@ts-ignore
        let { width, body, sideMenu } = { ...this.state }
        return Div({
            children: [
                SideNav({ width, sideMenu }),
                new MainPage({
                    width, body,
                    toggle: () => this.toggle(),
                })
            ]
        })
    }
}
