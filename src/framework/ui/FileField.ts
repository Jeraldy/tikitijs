import TextView from "../core/TextView"
import FileInput from "../core/FileInput"
import Label from "../core/Label"
import Span from "../core/Span"

const style = {
    width: "0.1px",
    height: "0.1px",
    opacity: "0",
    overflow: "hidden",
    position: "absolute",
    zIndex: " -1",
    backgroundColor: '#E6E6E6',
}

const labelStyle = {
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: '#E6E6E6',
    width: "100px",
    minHeight: "30px",
    cursor: "pointer",
    padding: '5px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}

export default (props: any = {}) => {
    props.style = { ...style, ...props.style }
    props.children = [TextView(props.label || '')]
    delete props.label
    const ref = props.id || Math.random()
    init(ref);
    return Span({
        children: [
            FileInput({
                ...props,
                id: ref,
            }),
            Label({
                style: labelStyle,
                for: ref,
                children: [
                    TextView("Choose File")
                ]
            })
        ]
    })
}

function init(id: any) {
    document.addEventListener("DOMContentLoaded", (_) => {
        var input = document.getElementById(id);
        input.addEventListener('change', (e) => {
            //@ts-ignore
            input.nextElementSibling.textContent = e.target.files[0].name || "Choose File"
        });
    });
}
