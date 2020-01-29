import Div from "../Core/Div";

export default class Body {
    constructor(props?: {}) {
        //@ts-ignore
        props.class ? props.class += " new-wrapper" : props.class = "new-wrapper";
        return Div({...props})
    }
}