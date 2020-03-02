import Div from "../../core/Div"
import TextView from "../../core/TextView"
import Size from "../../utils/Size"
import Animate from "../../animation/Animate"
import Button from "../../core/Button";
import './style.css';

const style = {
    backgroundColor: '#4D5573',
    color: 'white',
    cursor: 'pointer',
    padding: Size._8px,
    width: Size._220px,
    border: '1px solid #4D5573'
}

const _style = {
    backgroundColor: '#424242',
    color: 'white',
    height: '0px'
}

export default ({ title }: { title: "" }) => {
    return MenuItem(title)
}

function MenuItem(title: string) {

    const btn = Button({ class: "collapsible", children: [TextView(title)] })
    btn.addEventListener("click", function () {
        const contents = document.getElementsByClassName('content');
        const content = this.nextSibling;
        //@ts-ignore
        for (let el of contents) {
            if (el != content) {
                el.style.visibility = 'hidden';
                el.style.opacity = '0';
                el.style.height = '0px';
            }
        }

        if (content.style.visibility == 'visible') {
            content.style.visibility = 'hidden';
            content.style.opacity = '0';
            content.style.height = '0px';
        } else {
            content.style.visibility = 'visible';
            content.style.opacity = '1';
            content.style.height = Size._100px;
        }
    });

    return Div({
        children: [btn, Div({
            class: "content",
            children: [TextView(" Contets for " + title)],
            style: {
                height: Size._0px
            }
        })]
    })
}

