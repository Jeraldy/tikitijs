import TextView from "../../core/TextView";
//@ts-ignore
import WindowDatePicker from 'window-date-picker';
import Div from "../../core/Div";
import TextInput from "../../core/TextInput";
import Button from "../../core/Button";

export default (props: any) => {
    document.addEventListener("DOMContentLoaded",()=>{
        const picker = new WindowDatePicker({
            el: '#picker',
            toggleEl: '#toggle',
            inputEl: '#demo'
        });
    })
    return Div({
        children: [
            Div({ id: 'picker', }),
            TextInput({ id: "demo" }),
            Button({id:"toggle"})
        ]
    })
}