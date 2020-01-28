import Dashboard from "./Dashboard/index";
import TopBar from "./Dashboard/TopBar";
import SideBar from "./Dashboard/SideBar";
import Body from "./Dashboard/Body";
import Div from "./Core/Div";
import Menu from "./Dashboard/Menu";
import MenuItem from "./Dashboard/MenuItem";
import MButton from "./Forms/MButton/index";
import Button from "./Core/Button";
import TextView from "./Core/TextView";
import DataTable from "./Forms/DataTable/index";
import DataTableBody from "./Forms/DataTable/DataTableBody";
import Th from "./Core/Th";
import Td from "./Core/Td";
import DataTableHead from "./Forms/DataTable/DataTableHead";
import Tr from "./Core/Tr";

function Main() {

    let tbody = new DataTableBody([
        Td({ children: [TextView("Dessert")] }),
        Td({ children: [TextView("Dessert")] }),
    ])
    var i = 0;

    return Dashboard({
        topBar: new TopBar(),
        sideBar: new SideBar({
            menu: new Menu({
                menuItems: [
                    new MenuItem({
                        title: "Dashboard",
                        icon: "fa fa-dashboard",
                        route: "/dashboard"
                    }),
                    new MenuItem({
                        title: "Settings",
                        icon: "fa fa-gear",
                    })
                ]
            })
        }),
        body: new Body({
            children: [
                Div({
                    style: 'padding: 30px',
                    children: [
                        Button({
                            children: [
                                TextView("Add Data")
                            ],
                            onclick: () => {
                                i += 1;
                                tbody.addTr(
                                    Tr({
                                        children: [
                                            Td({ children: [TextView("Dessert-" + i)] }),
                                            Td({ children: [TextView("Dessert-" + i)] }),
                                        ]
                                    })
                                )
                            }
                        }),
                        Div({
                            style: "background-color:white;padding:8px",
                            children: [
                                new DataTable({
                                    head: new DataTableHead([
                                        Th({ children: [TextView("Full Name")] }),
                                        Th({ children: [TextView("Age")] }),
                                    ]).render(),
                                    body: tbody.render(),
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    })
}

document.body.appendChild(Main());
