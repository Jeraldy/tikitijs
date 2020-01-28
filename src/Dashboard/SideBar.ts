import Button from "../Core/Button";
import Div from "../Core/Div";
import Nav from "../Core/Nav";
import Link from "../Core/Link";
import TextView from "../Core/TextView";
import Menu from "./Menu";

interface Params {
    title?: string,
    menu?: Menu
}

export default class SideBar {
    constructor(params?: Params) {
        toggleMenu();
        return Div({
            class: "primary-nav",
            children: [
                Button({
                    class: "hamburger open-panel nav-toggle",
                    style: "height: 60px;outline: none;"
                }),
                Nav({
                    role: "navigation",
                    class: "menu",
                    children: [
                        Link({
                            href: "#",
                            class: "logotype",
                            children: [
                                TextView(params.title || '')
                            ]
                        }),
                        Div({
                            class: "overflow-container",
                            children: [
                                params.menu || null
                            ]
                        })
                    ]
                })
            ]
        })
    }
}

function toggleMenu() {
    document.addEventListener("DOMContentLoaded", function (event) {
        var nav = document.querySelector(".nav-toggle")
        nav.addEventListener('click', () => {
            var el = document.getElementsByTagName("html")[0];
            el.classList.toggle('openNav');
            nav.classList.toggle('active');
        });
    });
}