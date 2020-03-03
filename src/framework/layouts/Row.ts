import Div from "../core/Div"

const style = (align?: string) => {
    return {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: align || RowAlignment.Start
    }
}

enum rowAlignment {
    SpaceEvenly = 'space-evenly',
    SpaceBetween = 'space-between',
    Start = 'flex-start',
    End = 'flex-end',
    Center = 'center'
}

type rAlign = rowAlignment.Start | rowAlignment.End | rowAlignment.Center
    | rowAlignment.SpaceBetween | rowAlignment.SpaceEvenly

export default ({ children, align, ...props }:
    { children: Array<any>, align?: rAlign, props?: any }) => {

    return Div({ children, style: style(align), ...props })
}

export const RowAlignment = rowAlignment;