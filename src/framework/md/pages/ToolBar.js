import AppBar from "../AppBars/AppBar"
import Actions from "../AppBars/Actions"
import ActionItem from "../AppBars/ActionItem"
import AppBarTitle from "../AppBars/AppBarTitle"
import BarType from "../AppBars/AppBarType"
import Alignment from "../AppBars/ActionAlignment"

export default (props)=>{
    return  AppBar({
        barType: BarType.DENSE,
        children: [
            Actions({
                align: Alignment.START,
                items: [
                    ActionItem({
                        icon: 'menu',
                        onclick: () => props.toggleNav()
                    }),
                    AppBarTitle("")
                ]
            }),
            Actions({
                align: Alignment.END,
                items: [
                    ActionItem({ icon: 'bookmark' }),
                    ActionItem({ icon: 'print' })
                ]
            })
        ]
    })
}