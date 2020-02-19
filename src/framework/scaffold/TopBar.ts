import Nav from "../core/Nav";
import Button from "../core/Button";
import Icon from "../ui/Icon";

export default class TopBar {
    constructor(params?: any) {
        return Nav({
            style: TopBar_Style,
            children: [
                Button({
                    onclick: () => params.toggle(),
                    children: [Icon({ name: "menu" })],
                    style: Btn_Style
                })
            ]
        })
    }
}

const TopBar_Style = {
    backgroundColor: "#FFFFFF",
    boxShadow: "0 3px 3px -3px rgba(0,0,0,.2)",
    color: "black",
    height: "40px"
}

const Btn_Style = {
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    cursor: 'pointer'
}