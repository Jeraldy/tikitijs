import Div from "../core/Div";
import Tikiti from "../tikiti/index";
import Link from "../core/Link";
import TextView from "../core/TextView";
import TopBar from "./TopBar";
import "./index.css";
import TextInput from "../core/TextInput";
import Button from "../core/Button";

export default class Scaffold extends Tikiti {
    constructor() {
        super();
        this.state = {
            name: "John",
            width: "0px",
        }
        this.handleChange = this.handleChange.bind(this);

        return this.connect();
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
                }),
                Button({
                    children: [
                        TextView("SWAL")
                    ],
                    onclick: () => this.toggleNav()
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
