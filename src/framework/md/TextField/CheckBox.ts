import Div from "../../core/Div"
import Label from "../../core/Label"
import TextInput from "../../core/TextInput"
import SVG from "../../core/SVG"
import Path from "../../core/Path"
import { genId } from "../../ui/utils"

export default (params: any) => {
    //@ts-ignore
    let { label, id, ...props } = { ...params }
    id = id || genId()
    initCheckBox(id)
    return Div({
        class: `mdc-form-field mdc-form-field-${id}`,
        children: [
            Div({
                class: `mdc-checkbox mdc-checkbox-${id}`,
                children: [
                    TextInput({
                        type: "checkbox",
                        class: "mdc-checkbox__native-control",
                        checked: true,
                        id,
                        ...props
                    }),
                    Div({
                        class: "mdc-checkbox__background",
                        children: [
                            SVG({
                                class: "mdc-checkbox__checkmark",
                                viewBox: "0 0 24 24",
                                children: [
                                    Path({
                                        class: "mdc-checkbox__checkmark-path",
                                        fill: "none",
                                        d: "M1.73,12.91 8.1,19.28 22.79,4.59"
                                    })
                                ]
                            }),
                            Div({ class: "mdc-checkbox__mixedmark" })
                        ]
                    }),
                    Div({ class: "mdc-checkbox__ripple" })
                ]
            }),
            Label({ for: "checkbox-1" })
        ]
    })
}

//@ts-ignore
import { MDCFormField } from '@material/form-field';
//@ts-ignore
import { MDCCheckbox } from '@material/checkbox';

function initCheckBox(id: string) {
    document.addEventListener("DOMContentLoaded", (_) => {
        const checkbox = new MDCCheckbox(document.querySelector(`.mdc-checkbox-${id}`));
        const formField = new MDCFormField(document.querySelector(`.mdc-form-field-${id}`));
        formField.input = checkbox;
    });
}