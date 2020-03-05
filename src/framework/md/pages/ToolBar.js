import AppBar from "../../widgets/AppBars/AppBar";
import Actions from "../../widgets/AppBars/Actions";
import ActionItem from "../../widgets/Button/ActionButton";
import AppBarTitle from "../../widgets/AppBars/AppBarTitle";
import BarType from "../../widgets/AppBars/AppBarType";
import Alignment from "../../widgets/AppBars/ActionAlignment";

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