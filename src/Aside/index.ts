import UnorderedList from "../Core/UnorderedList"
import ListItem from "../Core/ListItem"
import TextInput from "../Core/TextInput"
import Label from "../Core/Label"
import TextView from "../Core/TextView"
import Nav from "../Core/Nav"
import Link from "../Core/Link"


export default () => {
    return Nav({
        class: "slide-menu",
        id: "example-menu",
        children: [
            UnorderedList({
                children:[
                    ListItem({
                        children:[
                            Link({
                                href:"#",
                                children:[TextView("Home")]
                            })
                        ]
                    })
                ]
            })
        ]
    })
}