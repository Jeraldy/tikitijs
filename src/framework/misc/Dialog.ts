import Div from "../core/Div"
import Span from "../core/Span"
import TextView from "../core/TextView"
import Paragraph from "../core/Paragraph"
import './style.css';
import Size from "../utils/Size"
import Icon from "../ui/Icon"
import Row, { RowAlignment } from "../layouts/Row"
import Button from "../md/Button/Button"
import ButtonTypes from "../md/Button/ButtonTypes"
import Hr from "../core/Hr"
import ActionItem from "../md/AppBars/ActionItem";

export default ({ open = false, title}: { open?: boolean,title: string }) => {
    const modal = Div({
        class: 'modal',
        style: {
            display: open ? "block" : "none",
            boxShadow: '-3px 3px 3px -3px rgba(0,0,0,.5)',
        },
        children: [
            Row({
                align: RowAlignment.Center,
                children: [
                    Div({
                        class: "modal-content",
                        style: {
                            width: Size._600px
                        },
                        children: [
                            Div({
                                class: "modal-header",
                                style: {
                                    padding: Size._8px
                                },
                                children: [
                                    Row({
                                        align: RowAlignment.SpaceBetween,
                                        children: [
                                            Div({
                                                style: {
                                                    marginTop: Size._10px
                                                },
                                                children: [
                                                    TextView("Title Goes Here")
                                                ]
                                            }),
                                            ActionItem({
                                                icon: 'close',
                                                props: {
                                                    onclick: () => modal.style.display = "none",
                                                    style: {
                                                        marginTop: '-5px',
                                                    }
                                                }
                                            })
                                        ]
                                    })
                                ]
                            }),
                            Div({
                                class: "modal-body",
                                style: {
                                    height: Size._200px
                                },
                                children: [
                                    Paragraph({
                                        children: [TextView(
                                            "Some text in the Modal Body"
                                        )]
                                    })
                                ]
                            }),
                            Hr(),
                            Div({
                                style: {
                                    padding: Size._8px
                                },
                                children: [
                                    Row({
                                        align: RowAlignment.End,
                                        children: [
                                            Button({
                                                type: ButtonTypes.OUTLINED, label: 'OKEY',
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    })

    initModal(modal)
    return modal;
}

function initModal(modal: HTMLElement) {
    window.onclick = function (event: Event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}