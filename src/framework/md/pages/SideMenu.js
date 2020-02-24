import DrawerAction from "../Drawer/Actions";
import DrawerActionItem, { DrawerActionDivider } from "../Drawer/ActionItem";

export default (params) => {
    return DrawerAction({
        items: [
            DrawerActionDivider(),
            DrawerActionItem({
                label: 'Table',
                icon: 'dashboard',
                onclick: () => params.goToPage(1)
            }),
            DrawerActionItem({
                label: 'Form',
                icon: 'settings',
                onclick: () => params.goToPage(2)
            }),
            DrawerActionDivider(),
            DrawerActionItem({
                label: 'List',
                icon: 'share',
                onclick: () => params.goToPage(3)
            }),
        ]
    })
}