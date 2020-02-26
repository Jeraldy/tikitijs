import Div from "../core/Div"

const style = {
    display:'flex',
    flexDirection: 'column',
    height:'100%'
}

export default ({ children }: { children: Array<any> }) => {
    return Div({ children, style })
}