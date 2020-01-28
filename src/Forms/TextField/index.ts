import TextInput from "../../Core/TextInput";
import AreaInput from "../../Core/AreaInput";
import Div from "../../Core/Div";
import Label from "../../Core/Label";
import TextView from "../../Core/TextView";
import init from "./init";

interface Params {
    id: string,
    label: string,
    props?: {}
}

export class TextField {

    constructor(params: Params) {
        init(params.id );
        return Div({
            class: "mdc-text-field mdc-text-field--outlined " + params.id + "",
            children: [
                TextInput({
                    class: "mdc-text-field__input",
                    id: params.id,
                    ...params.props
                }),
                Div({
                    class: "mdc-notched-outline",
                    children: [
                        Div({ class: "mdc-notched-outline__leading" }),
                        Div({
                            class: "mdc-notched-outline__notch",
                            children: [
                                Label({
                                    for: params.id,
                                    class: "mdc-floating-label",
                                    children: [
                                        TextView(params.label)
                                    ]
                                })
                            ]
                        }),
                        Div({ class: "mdc-notched-outline__trailing" }),
                    ]
                })
            ]
        })
    }
}

export class TextArea {

    constructor(params: Params) {
        init(params.id );
        return Div({
            class: "mdc-text-field mdc-text-field--textarea " + params.id + "",
            children: [
                AreaInput({
                    class: "mdc-text-field__input",
                    id: params.id,
                    ...params.props
                }),
                Div({
                    class: "mdc-notched-outline",
                    children: [
                        Div({ class: "mdc-notched-outline__leading" }),
                        Div({
                            class: "mdc-notched-outline__notch",
                            children: [
                                Label({
                                    for: params.id,
                                    class: "mdc-floating-label",
                                    children: [
                                        TextView(params.label)
                                    ]
                                })
                            ]
                        }),
                        Div({ class: "mdc-notched-outline__trailing" }),
                    ]
                })
            ]
        })
    }
}
