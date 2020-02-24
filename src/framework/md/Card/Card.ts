import Div from "../../core/Div"

export default (props: any = {}) => {
    return Div({
        class: 'mdc-card',
        ...props
    })
}