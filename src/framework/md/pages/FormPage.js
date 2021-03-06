import Row, { RowAlignment } from "../../layouts/Row";
import CheckBox from "../../widgets/CheckBox/index";
import DatePicker from "../../widgets/DatePicker/index";
import Card from "../../widgets/Card/index";
import Divider from "../../widgets/Divider/index";
import Size from "../../utils/Size";
import DropDown from "../../widgets/DropDown/index";
import DropDownItem from "../../widgets/DropDown/DropDownItem";
import FileField from "../../widgets/FileField/index";
import RadioButton from "../../widgets/RadioButton/index";
import SearchField from "../../widgets/SearchField/index";
import Loader from "../../widgets/Loader/index";
import TextField from "../../widgets/TextField/index";
import Text from '../../widgets/Text/Index';
import Colors from "../../utils/Colors";
import TextArea from "../../widgets/TextArea/index";
import Button from "../../widgets/Button/Button";
import ButtonType from "../../widgets/Button/ButtonTypes";

export default () => {
    return Card({
        style: { padding: Size._20px },
        children: [
            Row({
                align: RowAlignment.SpaceEvenly,
                children: [
                    Button({ type: ButtonType.FLAT, label: 'FLAT' }),
                    Button({ type: ButtonType.RAISED, label: 'RAISED' }),
                    Button({ type: ButtonType.OUTLINED, label: 'OUTLINED' }),
                    Button({ type: ButtonType.UNELEVETED, label: 'UNELEVETED' }),
                    //_Button({ label: 'DEFAULT' }),

                ]
            }),
            Divider(),
            Row({
                align: RowAlignment.SpaceEvenly,
                children: [
                    TextField({ placeholder: 'default', style: { height: '20px' } }),
                    DropDown({
                        children: [
                            DropDownItem({ text: 'Male', value: 'M' }),
                            DropDownItem({ text: 'Female', value: 'F' }),
                        ]
                    }),
                    CheckBox(),
                    DatePicker()
                ]
            }),
            Divider(),
            Row({
                align: RowAlignment.SpaceEvenly,
                children: [
                    FileField(),
                    RadioButton(),
                    SearchField(),
                    Loader()
                ]
            }),
            Divider(),
            Row({
                align: RowAlignment.SpaceEvenly,
                children: [
                    Text("Text label", {
                        color: Colors.dark_red,
                        fontWeight: 'bold'
                    }),
                    RadioButton(),
                    SearchField(),
                    TextArea()
                ]
            }),
        ]
    })
}