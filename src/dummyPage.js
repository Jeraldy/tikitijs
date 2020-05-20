import Div from "./framework/core/Div";
import TextView from "./framework/core/TextView";
import Size from "./framework/utils/Size";
import Colors from "./framework/utils/Colors";
import Button from "./framework/core/Button";

export default (props) => {
    
    return Div({
        style: {
            width: Size._200px,
            height: props.height,
            backgroundColor: Colors.acid_green,
            transition: 'height .3s'
        },
        children: [
            Button({
                children: [TextView("Toggle Width")],
                onclick: () => {
                    props.toggleHeight()
                }
            })
        ]
    })
}