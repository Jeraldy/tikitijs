import Nav from "../core/Nav"
import UnorderedList from "../core/UnorderedList"
import ListItem from "../core/ListItem"
import Link from "../core/Link"
import TextView from "../core/TextView"
//@ts-ignore
import '@grubersjoe/slide-menu/';
import Colors from "../utils/Colors"
import Size from "../utils/Size"
import "./slide-menu.scss";
import Div from "../core/Div"
import Button from "../core/Button"

export default () => {
    initSlideMenu();
    return Nav({
        class: "slide-menu",
        id: "example-menu",
        style: {
            backgroundColor: Colors.dark_green,
            width: Size._250px,
            padding: Size._10px,
            color: Colors.dutch_white,
            fontWeight: 'bold',
            fontSize: Size._18px
        },
        children: [
            // Div({
            //     class: 'controls',
            //     children: [
            //         Button({
            //             class:"slide-menu__control", 
            //             'data-action':"open",
            //             children: [
            //                 TextView("Open")
            //             ]
            //         }),
            //         Button({
            //             class: "btn slide-menu__control",
            //             'data-action': "back",
            //             children: [
            //                 TextView("Back")
            //             ]
            //         })
            //     ]
            // }),
            UnorderedList({
                children: [
                    ListItem({
                        children: [
                            Link({
                                children: [
                                    TextView("Devices")
                                ]
                            }),
                            UnorderedList({
                                children: [
                                    ListItem({
                                        children: [
                                            TextView("Computers")
                                        ]
                                    }),
                                    ListItem({
                                        children: [
                                            TextView("Tablets")
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    })
}


function initSlideMenu() {
    document.addEventListener("DOMContentLoaded", function () {
        const menuElement = document.getElementById('example-menu');
        //@ts-ignore
        const menu = new SlideMenu(menuElement, {
            showBackLink: true,
            submenuLinkAfter: ' <strong>></strong>'
        });
        menu.open()
    });
}