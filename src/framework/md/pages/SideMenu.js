import DrawerAction from "../Drawer/Actions";
import DrawerActionItem, { DrawerActionDivider } from "../Drawer/ActionItem";
import Icons from "../../utils/Icons";

export default ({ key, goToPage }) => {
    return DrawerAction({
        items: [
            DrawerActionDivider(),
            DrawerActionItem({
                label: 'Table',
                activated: key == 1,
                icon: Icons.dashboard,
                onclick: () => goToPage(1)
            }),
            DrawerActionItem({
                label: 'Form',
                icon: 'settings',
                activated: key == 2,
                onclick: () => goToPage(2)
            }),
            DrawerActionDivider(),
            DrawerActionItem({
                label: 'List',
                icon: Icons.list,
                activated: key == 3,
                onclick: () => goToPage(3),
            }),
            DrawerActionItem({
                label: 'Grid',
                icon: Icons.card_giftcard,
                activated: key == 4,
                onclick: () => goToPage(4)
            }),
            DrawerActionItem({
                label: 'Layouts',
                icon: Icons.loyalty,
                activated: key == 5,
                onclick: () => goToPage(5)
            }),
            DrawerActionDivider(),
            DrawerActionItem({
                label: 'Misc',
                icon: Icons.important_devices,
                activated: key == 6,
                onclick: () => goToPage(6)
            }),
        ]
    })
}

