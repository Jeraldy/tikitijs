import Nav from "../Core/Nav";

export default class TopBar {
    constructor(props?: {}) {
        return Nav({
            style: "background-color: #FFFFFF;height: 60px;box-shadow: 0 3px 3px -3px rgba(0,0,0,.2);",
            ...props
        })
    }
}