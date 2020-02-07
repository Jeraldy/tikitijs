import Div from "../core/Div";
import Tikiti from "../tikiti/index";
import Link from "../core/Link";
import TextView from "../core/TextView";
import TopBar from "./TopBar";
import "./index.css";
import TextInput from "../core/TextInput";

export default class Scaffold extends Tikiti {
    width: string;
    constructor() {
        super();
        this.width = "0px"
        this.state = {
            name: "",
            width: "0px",
        }
        this.handleChange = this.handleChange.bind(this);

        return this.connectedCallBack(this);
    }

    handleChange(e: Event) {
        this.setState({
            //@ts-ignore
            name: e.target.value
        })
    }

    toggleNav() {
        this.setState({
            width: this.state.width == "0px" ? "250px" : "0px"
        })
    }

    sideNav() {
        return Div({
            //id: "side-nav-id",
            class: "sidenav",
            style: {
                width: this.state.width
            },
            children: [
                Link({
                    href: "javascript:void(0)",
                    class: "closebtn",
                    onclick: () => this.toggleNav(),
                    children: [TextView("X")]
                }),
                Link({
                    href: "#",
                    children: [TextView("About")]
                })
            ]
        })
    }

    mainPage() {
        return Div({
            //id: "main-id",
            style: {
                backgroundColor: "#EDECEC",
                height: "100vh",
                marginLeft: this.state.width
            },
            children: [
                new TopBar({
                    toggleNav: () => this.toggleNav()
                }),
                TextInput({
                        onkeyup: this.handleChange,
                        value: this.state.name,
                        // style:{
                        //     width: this.state.width
                        // }
                    })
            ]
        })
    }

    render() {
        return Div({
            children: [
                this.sideNav(),
                this.mainPage()
            ]
        })
    }
}
