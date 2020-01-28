import { MDCDrawer } from "@material/drawer";
import { MDCTopAppBar } from "@material/top-app-bar";

export default () => {
    document.addEventListener("DOMContentLoaded", function (event) {
        const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));
        const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
        topAppBar.setScrollTarget(document.getElementById('main-content'));
        topAppBar.listen('MDCTopAppBar:nav', () => {
            drawer.open = !drawer.open;
        });
    });
}