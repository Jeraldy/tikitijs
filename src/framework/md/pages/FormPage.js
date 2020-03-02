import Card from "../../ui/Card"
import Button from "../Button/Button"
import ButtonTypes from "../Button/ButtonTypes"
import _Button from '../../ui/Button';
import Div from "../../core/Div";
import _TextField from "../../ui/TextField";
import Row, { RowAlignment } from "../../layouts/Row";
import DatePicker from "../../widgets/DatePicker/index";

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
                    _Button({ label: 'DEFAULT' }),

                ]
            }),
            Card({
                style: { padding: '20px' },
                children: [
                    Row({
                        align: RowAlignment.SpaceEvenly,
                        children: [
                            _TextField({ placeholder: 'default', style: { height: '20px' } }),
                            Button({ type: ButtonTypes.FLAT, label: 'FLAT' }),
                        ]
                    }),
                ]
            })
        ]
    })
}