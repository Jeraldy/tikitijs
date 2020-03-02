import Div from "../core/Div"

export default (props: any = {}) => {
    let style = { ...props.style || {} }
    delete props.style
    return Div({
        style: {
            overflowX: 'auto',
            border: '1px solid #ccc',
            padding: '5px',
            borderRadius: '2px',
            boxShadow: '-3px 3px 3px -3px rgba(0,0,0,.5)',
            backgroundColor: 'white',
            height:'100%',
            ...style
        },
        ...props
    })
}