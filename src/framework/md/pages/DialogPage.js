import Div from "../../core/Div"
import Dialog from "../../misc/Dialog"
import { StatefulWidget } from "../../tikiti/index"
import Card from "../../ui/Card"
import Button from "../Button/Button"
import ButtonTypes from "../Button/ButtonTypes"
import Loader from "../../widgets/Loader/index"
import Row, { RowAlignment } from "../../layouts/Row"
import AlertBox from "../../widgets/AlertBox/index"

class DialogPage extends StatefulWidget {
    constructor() {
        super()
        this.state = { open: false }
        return this.connect()
    }

    render() {
        return Card({
            children: [
                Row({
                    align: RowAlignment.SpaceEvenly,
                    children: [
                        Button({
                            type: ButtonTypes.RAISED, label: 'OPEN DIALOG',
                            onclick: () => this.setState({ open: true })
                        }),
                        Loader(),
                        Button({
                            type: ButtonTypes.RAISED, label: 'ALERT BOX',
                            onclick: () => AlertBox({ text: 'Saved Successful..!', icon: 'success' })
                        }),
                    ]
                }),
                Dialog({ open: this.state.open })
            ]
        })
    }
}

export default DialogPage;
