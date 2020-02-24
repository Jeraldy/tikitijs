import { genId } from "../../ui/utils"
import Div from "../../core/Div"
import TextView from "../../core/TextView"
import Label from "../../core/Label"
//@ts-ignore
import { MDCTextField } from '@material/textfield';
import AreaInput from "../../core/AreaInput";

export default (params: any) => {
    //@ts-ignore
    let { label, id, ...props } = { ...params }
    id = id || genId()
    initTextField(id)
    return Div({
        class: `mdc-text-field mdc-text-field--textarea text-field-${id}`,
        children: [
            AreaInput({
                class: "mdc-text-field__input", id,
                ...props
            }),
            Div({
                class: "mdc-notched-outline",
                children: [
                    Div({ class: "mdc-notched-outline__leading" }),
                    Div({
                        class: "mdc-notched-outline__notch",
                        children: [
                            Label({
                                for: id,
                                class: "mdc-floating-label",
                                children: [
                                    TextView(label || '')
                                ]
                            })
                        ]
                    }),
                    Div({ class: "mdc-notched-outline__trailing" })
                ]
            })
        ]
    })
}

function initTextField(id: string) {
    document.addEventListener("DOMContentLoaded", (_) => {
        new MDCTextField(document.querySelector(`.text-field-${id}`));
    });
}