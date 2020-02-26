import Div from "../core/Div"

const style = ({ align }: { align?: string }) => {
    return {
        display: 'flex',
        justifyContent: align || RowAlignment.Start
    }
}

type rAlign = rowAlignment.Start | rowAlignment.End | rowAlignment.Center
    | rowAlignment.SpaceBetween | rowAlignment.SpaceEvenly

export default ({ children, align, ...props }:
    { children: Array<any>, align: rAlign, props: any }) => {

    return Div({ children, style: style({ align }), ...props })
}

enum rowAlignment {
    SpaceEvenly = 'space-evenly',
    SpaceBetween = 'space-between',
    Start = 'flex-start',
    End = 'flex-end',
    Center = 'center'
}

export const RowAlignment = rowAlignment;