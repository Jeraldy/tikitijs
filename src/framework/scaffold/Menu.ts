import Div from "../core/Div"
import UnorderedList from "../core/UnorderedList"
import ListItem from "../core/ListItem"
import Link from "../core/Link"
import TextView from "../core/TextView"

export function Menu(params: any) {
    //@ts-ignore
    const { menuItems, ...props } = { ...params }
    return Div({
        ...props,
        children: [
            UnorderedList({
                children: [...menuItems || []]
            })
        ],
    })
}


export function MenuItem(params: any) {
    //@ts-ignore
    const { label, ...props } = { ...params }
    return ListItem({
        children: [
            Link({
                href: '#',
                children: [TextView(label || '')],
                ...props
            }),
        ],
        style: MenuItemStyle,
        id: Math.random()
    })
}

const MenuItemStyle = {
    position: 'relative',
    left: '-30px',
    border: '1px solid #ccc',
    padding: '8px'
}