import Scaffold from './AppBar/Scaffold';
import Body from './AppBar/Body';
import SideBar from './AppBar/SideBar';
import Menu from './AppBar/Menu';
import MenuItem from './AppBar/MenuItem';
import TextView from './Core/TextView';
import { SideBarType } from './AppBar/Constants';
import TopBar from './AppBar/TopBar';
import { TopBarEndActions, TopBarStartActions, ActionItem } from './AppBar/BarActions';
import Div from './Core/Div';
import DataTable from './Forms/DataTable/index';
import DataTableHead from './Forms/DataTable/DataTableHead';
import Th from './Core/Th';
import DataTableBody from './Forms/DataTable/DataTableBody';
import Td from './Core/Td';
import Tr from './Core/Tr';

function Switch(sw: Array<{ name: string, component: Node }>, name: string) {
  var node = document.getElementById("body-container")
  node.innerHTML = '';
  sw.forEach(child => {
    if (child.name == name) {
      node.appendChild(child.component)
    }
  })
}

function App() {
  let x = 0;
  let tbody = new DataTableBody([
    Td({ children: [TextView("Dessert")] }),
    Td({ children: [TextView("Dessert")] }),
    Td({ children: [TextView("Dessert")] }),
    Td({ children: [TextView("Dessert")] }),
    Td({ children: [TextView("Dessert")] }),
  ])
  tbody.addTr(
    Tr({
      children: [
        Td({ children: [TextView("Dessert")] }),
        Td({ children: [TextView("Dessert")] }),
        Td({ children: [TextView("Deus")] }),
        Td({ children: [TextView("Dessert")] }),
        Td({ children: [TextView("Dessert")] }),
      ]
    })
  )
  tbody.addTr(
    Tr({
      children: [
        Td({ children: [TextView("Dessert")] }),
        Td({ children: [TextView("Dessert")] }),
        Td({ children: [TextView("Dessert")] }),
        Td({ children: [TextView("Dessert")] }),
        Td({ children: [TextView("Dessert")] }),
      ]
    })
  )
  tbody.addTr(
    Tr({
      children: [
        Td({ children: [TextView("Dessert")] }),
        Td({ children: [TextView("Dessert")] }),
        Td({ children: [TextView("Dessert")] }),
        Td({ children: [TextView("Dessert")] }),
        Td({ children: [TextView("Dessert")] }),
      ]
    })
  )
  var switcher = [
    {
      name: "Home", component: Div({
        style: "background-color:white;padding:8px",
        children: [
          new DataTable({
            head: new DataTableHead([
              Th({ children: [TextView("Full Name")] }),
              Th({ children: [TextView("Age")] }),
              Th({ children: [TextView("Age")] }),
              Th({ children: [TextView("Age")] }),
              Th({ children: [TextView("Age")] }),
            ]).render(),
            body: tbody.render(),
          })
        ]
      })
    },
    { name: "Settings", component: TextView("Settings" + x) }
  ]

  return Scaffold({
    topBar: new TopBar({
      topBarEndActions: new TopBarEndActions({
        children: [
          new ActionItem({
            icon: "settings",
            props: {
              onclick: () => console.log("Works...")
            }
          }),
          new ActionItem({
            icon: "more_vert"
          }),
        ]
      }),
      topBarStartActions: new TopBarStartActions({
        title: "Title",
      })
    }),
    body: new Body({
      style: "background-color:#F9F9F9;height:80%",
      children: [
        Div({ id: "body-container" })
      ]
    }),
    sideBar: new SideBar({
      type: SideBarType.Dismissible,
      menu: new Menu({
        menuItems: [
          new MenuItem({
            title: "Home",
            icon: "home",
            props: {
              onclick: () => {
                x += 1;
                Switch(switcher, "Home")
                console.log(x)
              }
            }
          }),
          new MenuItem({
            title: "Setting",
            icon: "settings",
            props: {
              onclick: () => {
                x += 1;
                Switch(switcher, "Settings")
              }
            }
          })
        ]
      })
    })
  })
}

document.body.appendChild(App());
