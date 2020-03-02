import Div from "../core/Div"

const style = ({ align }: { align?: string }) => {
    return {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: align
    }
}

type cAlign = colAlignment.Start | colAlignment.End | colAlignment.Center

export default ({ children, align }: { children: Array<any>, align?: cAlign }) => {
    return Div({ children, style: style({ align }) })
}

enum colAlignment {
    //SpaceEvenly = 'space-evenly',
    //SpaceBetween = 'space-between',
    Start = 'flex-start',
    End = 'flex-end',
    Center = 'center'
}

export const ColumnAlignment = colAlignment;