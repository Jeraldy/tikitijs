import Div from "../../core/Div"
import TextView from "../../core/TextView"
import Row, { RowAlignment } from "../../layouts/Row"
import Colors from "../../utils/Colors"
import Size from "../../utils/Size"
import Card from "../../ui/Card"
import TextField from "../../ui/TextField"
import Center from "../../layouts/Center"
import Break from "../../core/Break"
import Divider from "../../ui/Divider"
import Column from "../../layouts/Column"
import RelativeLayout, { Locate } from "../../layouts/RelativeLayout"

export default () => {
    return Div({
        children: [
            Card({
                children: [
                    Row({
                        children: [
                            Div({
                                children: [TextView("ROW LAYOUT")],
                                style: {
                                    padding: Size._15px,
                                    fontWeight: 'bold'
                                }
                            })
                        ],
                        align: RowAlignment.Center,
                    }),
                    Divider(),
                    Row({
                        children: [
                            RowChild('ALIGN', Colors.blue3),
                            RowChild('START', Colors.barn_red)
                        ],
                        align: RowAlignment.Start
                    }),
                    Divider(),
                    Row({
                        children: [
                            RowChild('ALIGN', Colors.blue3),
                            RowChild('END', Colors.barn_red)
                        ],
                        align: RowAlignment.End
                    }),
                    Divider(),
                    Row({
                        children: [
                            RowChild('CENTER', Colors.blue3),
                            RowChild('CENTER', Colors.barn_red)
                        ],
                        align: RowAlignment.Center
                    }),
                    Divider(),
                    Row({
                        children: [
                            RowChild('SPACE', Colors.blue3),
                            RowChild('EVENLY', Colors.barn_red)
                        ],
                        align: RowAlignment.SpaceEvenly
                    }),
                    Divider(),
                    Row({
                        children: [
                            RowChild('SPACE', Colors.blue3),
                            RowChild('BETWEEN', Colors.barn_red)
                        ],
                        align: RowAlignment.SpaceBetween
                    }),
                    Divider(),
                    Row({
                        children: [
                            FormChild(),
                            FormChild()
                        ],
                        align: RowAlignment.SpaceEvenly
                    }),
                ]
            }),
            //*************************************** */
            Break(),
            Card({
                children: [
                    Row({
                        children: [
                            Div({
                                children: [TextView(" CENTER LAYOUT ")],
                                style: {
                                    padding: Size._15px,
                                    fontWeight: 'bold'
                                }
                            })
                        ],
                        align: RowAlignment.Center,
                    }),
                    Divider(),
                    Div({
                        children: [
                            Center({ child: TextView("CENTER") })
                        ],
                        style: {
                            height: Size._300px,
                            width: Size._300px,
                            backgroundColor: Colors.earth_yellow,
                            color: Colors.antique_white
                        }
                    })
                ]
            }),
            //*************************************** */
            Break(),
            Card({
                children: [
                    Row({
                        children: [
                            Div({
                                children: [TextView(" COLUMN LAYOUT ")],
                                style: {
                                    padding: Size._15px,
                                    fontWeight: 'bold'
                                }
                            })
                        ],
                        align: RowAlignment.Center,
                    }),
                    Divider(),
                    Column({
                        children: [
                            RowChild('CHILD 1', Colors.blue3),
                            RowChild('CHILD 2', Colors.acid_green),
                            RowChild('CHILD 3', Colors.dark_sky_blue),
                            RowChild('CHILD 4', Colors.alloy_orange),
                        ]
                    })
                ]
            }),

            //*************************************** */
            Break(),
            Card({
                children: [
                    Row({
                        children: [
                            Div({
                                children: [TextView(" RELATIVE LAYOUT ")],
                                style: {
                                    padding: Size._15px,
                                    fontWeight: 'bold'
                                }
                            })
                        ],
                        align: RowAlignment.Center,
                    }),
                    Divider(),
                    Div({
                        children: [
                            RelativeLayout({
                                children: [
                                    Locate({
                                        child: RowChild('(10,10)', Colors.blue3),
                                        x: 10,
                                        y: 10
                                    }),
                                    Locate({
                                        child: RowChild('(50,100)', Colors.acid_green),
                                        x: 50,
                                        y: 100
                                    }),
                                    Locate({
                                        child: RowChild('(700,100)', Colors.dark_sky_blue),
                                        x: 700,
                                        y: 100
                                    }),
                                    Locate({
                                        child: RowChild('(700,400)', Colors.alloy_orange),
                                        x: 700,
                                        y: 400
                                    }),
                                ]
                            })
                        ],
                        style: {
                            height: Size._500px,
                            border: '5px dashed #ccc'
                        }
                    })
                ]
            })

        ]
    })
}

function RowChild(name, color) {
    return Div({
        style: {
            backgroundColor: color,
            height: Size._50px,
            width: Size._100px,
            display: 'flex',
            justifyContent: 'center', // Horizontal
            alignItems: 'center', // Vertical
            padding: Size._10px,
            color: Colors.antique_white
        },
        children: [
            TextView(name)
        ]
    })
}

function FormChild() {
    return Div({
        children: [
            Row({
                children: [
                    TextView("First Name: "),
                    TextField()
                ]
            })
        ],
        style: {
            width: 'max-content',
            padding: Size._10px
        }
    })
}