import { StatefulWidget, Tikiti } from "../framework/tikiti/index";
import Scaffold from "../framework/scaffold/index";
import Div from "../framework/core/Div";
import { Menu, MenuItem } from "../framework/scaffold/Menu";
import TablePage from "../TablePage";
import FormPage from '../FormPage';
import TextView from "../framework/core/TextView";
import SIZE from "../framework/utils/Size";

class App extends StatefulWidget {
  constructor() {
    super()
    this.state = { page: 1 }
    return this.connect();
  }

  currentPages(key) {
    switch (key) {
      case 1:
        return new TablePage()
      case 2:
        return new FormPage()
      case 3:
        return Div({ children: [TextView('Widgets')] })
      default:
        break
    }
  }

  goToPage(key) {
    this.setState({ page: key })
  }

  render() {
    return new Scaffold({
      sideMenu: Menu({
        menuItems: [
          MenuItem({
            label: 'Table',
            onclick: () => this.goToPage(1)
          }),
          MenuItem({
            label: 'Form',
            onclick: () => this.goToPage(2)
          }),
          MenuItem({
            label: 'Widgets',
            onclick: () => this.goToPage(3)
          }),
        ]
      }),
      body: Div({
        style: { padding: SIZE._20px },
        children: [
          this.currentPages(this.state.page)
        ]
      })
    })
  }
}


Tikiti.Init(new App());

