import Div from "../core/Div";
import Chungwa from "../chungwa/index";
import Link from "../core/Link";
import TextView from "../core/TextView";
import TopBar from "./TopBar";
import "./index.css";

export default class Scaffold extends Chungwa {
    width: string;
    constructor() {
        super();
        this.width = "50px"
        return this.connectedCallBack(this);
    }

    toggleNav() {
        document.getElementById("side-nav-id")
            .style.width = this.width == "50px" ? "250px" : "50px";
        document.getElementById("main-id")
            .style.marginLeft = this.width == "50px" ? "250px" : "50px";
        this.width = this.width == "50px" ? "250px" : "50px";
    }

    sideNav() {
        return Div({
            id: "side-nav-id",
            class: "sidenav",
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
            id: "main-id",
            style: {
                marginLeft: "50px",
                backgroundColor: "#EDECEC",
                height:"100vh"
            },
            children: [
                TextView(" MAIN PAGE "),
            ]
        })
    }

    render() {
        return Div({
            children: [
                new TopBar(),
                this.sideNav(),
                this.mainPage()
            ]
        })
    }
}
