import Card from "../../ui/Card"
import Button from "../Button/Button"
import ButtonTypes from "../Button/ButtonTypes"
import _Button from '../../ui/Button';
import Div from "../../core/Div";
import _TextField from "../../ui/TextField";
import TextField from "../TextField/TextField";
import textFieldTypes from "../TextField/TextFieldTypes";
import TextArea from "../TextField/TextArea";
import CheckBox from "../TextField/CheckBox";

export default () => {
    return Div({
        children: [
            Card({
                style: {
                    display: 'flex',
                    flexGrow: 'row',
                    justifyContent: 'space-between',
                    padding: '20px'
                },
                children: [
                    Button({ type: ButtonTypes.FLAT, label: 'FLAT' }),
                    Button({ type: ButtonTypes.RAISED, label: 'RAISED' }),
                    Button({ type: ButtonTypes.OUTLINED, label: 'OUTLINED' }),
                    Button({ type: ButtonTypes.UNELEVETED, label: 'UNELEVETED' }),
                    _Button({ label: 'DEFAULT' })
                ]
            }),
            Card({
                style: {
                    display: 'flex',
                    flexGrow: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    padding: '50px'
                },
                children: [
                    TextField({ label: 'Outlined', helperText: 'helper text' }),
                    TextField({ label: 'Outlined', leadingIcon: 'event' }),
                    TextField({ label: 'Outlined', trailingIcon: 'event' }),
                    _TextField({ placeholder: 'default', style: { height: '20px' } }),
                    TextArea({ label: 'textArea' }),
                    TextField({ label: 'Filled', type: textFieldTypes.FILLED, leadingIcon: 'event' }),
                    TextField({ label: 'Filled', type: textFieldTypes.FILLED }),
                    TextField({ label: 'Filled', type: textFieldTypes.FILLED, trailingIcon: 'event' }),
                ]
            }),
            Card({
                style: {
                    display: 'flex',
                    flexGrow: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    padding: '50px'
                },
                children: [
                    //CheckBox(),
                    TextField({ label: 'Outlined', leadingIcon: 'event' }),
                    TextField({ label: 'Outlined', trailingIcon: 'event' }),
                    _TextField({ placeholder: 'default', style: { height: '20px' } }),
                    TextArea({ label: 'textArea' }),
                    TextField({ label: 'Filled', type: textFieldTypes.FILLED, leadingIcon: 'event' }),
                    TextField({ label: 'Filled', type: textFieldTypes.FILLED }),
                    TextField({ label: 'Filled', type: textFieldTypes.FILLED, trailingIcon: 'event' }),
                ]
            })
        ]
    })
}