import RelativeLayout, { Locate } from '../../layouts/RelativeLayout';
import Div from '../../core/Div';
import Size from '../../utils/Size';
import Colors from '../../utils/Colors';
import TextView from '../../core/TextView';
import Card from '../../ui/Card';
import Row, { RowAlignment } from '../../layouts/Row';
import Divider from '../../ui/Divider';
import Animate from '../../animation/Animate';
import Stepper from '../../layouts/Stepper';

export default () => {

    return Card({
        children: [
            Row({
                children: [
                    Div({
                        children: [TextView(" ANIMATION ")],
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
                                child: RowChild('(10,10)', Colors.blue3, 'target'),
                                x: 10,
                                y: 10
                            }),
                            Locate({
                                child: RowChild('(50,100)', Colors.acid_green, ''),
                                x: 50,
                                y: 100
                            }),
                            Locate({
                                child: RowChild('(700,100)', Colors.dark_sky_blue, ''),
                                x: 700,
                                y: 100
                            }),
                            Locate({
                                child: RowChild('(700,400)', Colors.alloy_orange, ''),
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
            }),
        ]
    })
}

function RowChild(name, color, className) {
    return Div({
        class: className,
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
        ],
        onclick: () => {
            InitAnimation()
        }
    })
}

function InitAnimation() {
    Animate({
        targets: '.target',
        keyframes: [
            { translateY: -40 },
            { translateX: 250 },
            { translateY: 40 },
            { translateX: 0 },
            { translateY: 0 }
        ],
        duration: 4000,
        easing: 'easeOutElastic(1, .8)',
        loop: true
    });
}