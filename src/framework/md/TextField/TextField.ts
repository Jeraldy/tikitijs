import Div from "../../core/Div"
import TextInput from "../../core/TextInput"
import Label from "../../core/Label"
import TextView from "../../core/TextView"
import textFieldTypes from './TextFieldTypes';
//@ts-ignore
import { MDCTextField } from '@material/textfield';
import { genId } from "../../ui/utils";
import I from "../../core/I";

export default (props: any) => {
    let tType = props.type ? props.type : textFieldTypes.OUTLINED
    delete props.type
    return tType == textFieldTypes.OUTLINED ? oTextField(props) : fTextField(props)
}

function oTextField(params: any) {
    //@ts-ignore
    let { label, id, helperText, leadingIcon, trailingIcon, ...props } = { ...params }
    id = id || genId()
    let hasleadingIco = leadingIcon ? 'mdc-text-field--with-leading-icon' : ''
    let hastrailingIco = trailingIcon ? 'mdc-text-field--with-trailing-icon' : ''
    initTextField(id)
    return Div({
        children: [
            Div({
                class: `mdc-text-field mdc-text-field--outlined ${hastrailingIco} ${hasleadingIco} text-field-${id}`,
                children: [
                    leadingIcon ? LIcon(leadingIcon) : null,
                    TextInput({
                        class: "mdc-text-field__input", id,
                        'aria-controls': "my-helper-id" + id,
                        'aria-describedby': "my-helper-id" + id,
                        ...props
                    }),
                    trailingIcon ? TIcon(trailingIcon) : null,
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
            }),
            Div({
                class: "mdc-text-field-helper-line",
                children: [
                    Div({
                        class: "mdc-text-field-helper-text",
                        'aria-hidden': "true",
                        id: "my-helper-" + id,
                        children: [
                            TextView(helperText || '')
                        ]
                    })
                ]
            })
        ]
    })
}

function fTextField(params: any) {
    //@ts-ignore
    let { label, id, helperText, leadingIcon, trailingIcon, ...props } = { ...params }
    id = id || genId()
    let hasleadingIco = leadingIcon ? 'mdc-text-field--with-leading-icon' : ''
    let hastrailingIco = trailingIcon ? 'mdc-text-field--with-trailing-icon' : ''
    initTextField(id)
    return Div({
        class: `mdc-text-field ${hastrailingIco} ${hasleadingIco} text-field-${id}`,
        children: [
            leadingIcon ? LIcon(leadingIcon) : null,
            TextInput({
                class: "mdc-text-field__input", id,
                ...props
            }),
            trailingIcon ? TIcon(trailingIcon) : null,
            Div({ class: "mdc-line-ripple" }),
            Label({
                for: id,
                class: "mdc-floating-label",
                children: [
                    TextView(label || '')
                ]
            })
        ]
    })
}

function LIcon(icon: string) {
    return I({
        class: "material-icons mdc-text-field__icon mdc-text-field__icon--leading",
        tabindex: "0",
        role: "button",
        children: [
            TextView(icon)
        ]
    })
}

function TIcon(icon: string) {
    return I({
        class: "material-icons mdc-text-field__icon mdc-text-field__icon--trailing",
        tabindex: "0",
        role: "button",
        children: [
            TextView(icon)
        ]
    })
}

function initTextField(id: string) {
    document.addEventListener("DOMContentLoaded", (_) => {
        new MDCTextField(document.querySelector(`.text-field-${id}`));
    });
}