import { StatefulWidget } from "../tikiti/index";
import SideMenu from "./SideMenu";
import Div from "../core/Div";
import Button from "../ui/Button";

class SlideSideMenu extends StatefulWidget{
    constructor(){
        super()
        this.state = {open: true}
        return this.connect()
    }

    toggle(){
        this.setState({
            open: !this.state.open
        })
    }
    render(){
        return Div({
            children:[
                 Button({
                     label:'Toggle',
                     onclick: ()=>this.toggle()
                 }),
                SideMenu()
            ]
        })
    }
}

export default SlideSideMenu;