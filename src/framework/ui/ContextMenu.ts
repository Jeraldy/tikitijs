import Nav from "../core/Nav"
import Div from "../core/Div"
import TextView from "../core/TextView"
import Link from "../core/Link"

export default (props: any) => {
    return Nav({
        class: 'dropdown',
        children: [
            ...props.children || [],
            Div({
                class:'dropdown-content', 
                id:"myDropdown",
              children:[
                  Link({
                      href:"#",
                      children:[TextView("Hello")]
                  })
              ]
            })
        ]
    })
}