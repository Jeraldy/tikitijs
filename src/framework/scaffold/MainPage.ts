import Div from "../core/Div";
import TopBar from "./TopBar";

export default class MainPage {
    constructor(props: any) {
        return Div({
            style: {
                backgroundColor: "#EDECEC",
                height: "100vh",
                marginLeft: this.width(props.width)
            },
            children: [
                new TopBar({ toggle: () => props.toggle() }),
                props.body || null
            ]
        })

    }

    width(width: string) {
        let _width = parseInt(width.split('px')[0])
        return `${_width - 5}px`
    }
}