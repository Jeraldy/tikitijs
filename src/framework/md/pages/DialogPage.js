import { StatefulWidget } from "../../tikiti/index"
import Button from "../../widgets/Button/Button"
import ButtonTypes from "../../widgets/Button/ButtonTypes"
import Loader from "../../widgets/Loader/index"
import Row, { RowAlignment } from "../../layouts/Row"
import AlertBox from "../../widgets/AlertBox/index"
import Card from "../../widgets/Card/index"
import Dialog from "../../widgets/Dialog/index"
import Size from "../../utils/Size"

class DialogPage extends StatefulWidget {
    constructor() {
        super()
        this.state = { open: false }
        return this.connect()
    }

    render() {
        return Card({
            style:{
                padding: Size._20px
            },
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
