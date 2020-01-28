import Button from "../../Core/Button";
import Div from "../../Core/Div";
import Span from "../../Core/Span";
import TextView from "../../Core/TextView";
import './index.scss';

export default () => {

    return Button({
        class: "mdc-button--unelevated",
        children: [
            Div({ class: "mdc-button__ripple" }),
            Span({
                class: "mdc-button__label",
                children: [TextView("Button")]
            })
        ]
    })
}