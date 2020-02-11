import Button from "../core/Button"
import TextView from "../core/TextView"

const style = {
    width: "100px",
    height: "30px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    cursor: "pointer",
    outline: 'none',
    backgroundColor: '#E6E6E6',
}

export default (props: any = {}) => {
    props.style = { ...style, ...props.style }
    props.children = [TextView(props.label || '')]
    delete props.label
    return Button({
        ...props
    })
}

















        // onMouseOver: "this.style.backgroundColor='#E6E6E6'",
        // onMouseOut: "this.style.backgroundColor='#F7F7F9'",