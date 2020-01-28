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
import { TextField, TextArea } from './Forms/TextField/index';
import DropDown from './Core/DropDown';
import DropDownItem from './Core/DropDownItem';
import { Grid, GridCell } from './Layouts/index';

function App() {

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
      style: "background-color:#F9F9F9;height:90%",
      children: [
        Div({
          style: "padding: 60px",
          id:"default-body-id",
          children: [
            new Grid([
              new GridCell([
                new TextField({
                  id: "text-input-id",
                  label: "Name"
                }),
              ]),
              new GridCell([
                new TextArea({
                  id: "text-area-id",
                  label: "Description",
                }),
              ]),
              new GridCell([
                DropDown({
                  children: [
                    DropDownItem({
                      value: "1",
                      children: [
                        TextView("Male")
                      ]
                    }),
                    DropDownItem({
                      value: "2",
                      children: [
                        TextView("Female")
                      ]
                    })
                  ]
                })
              ])
            ]),
          ]
        })
      ]
    }),
    sideBar: new SideBar({
      type: SideBarType.Dismissible,
      menu: new Menu({
        menuItems: [
          new MenuItem({
            title: "Home",
            icon: "home"
          }),
          new MenuItem({
            title: "Setting",
            icon: "settings"
          })
        ]
      })
    })
  })
}

document.body.appendChild(App());
