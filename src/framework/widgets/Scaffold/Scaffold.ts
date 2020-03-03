import Div from "../../core/Div"
import Main from "../../core/Main"
import '../style.scss';

export default ({ drawer, appBar, body }: { drawer: any, appBar: any, body: any }) => {
    return Div({
        class: 'scaffold',
        children: [
            drawer,
            Div({
                class: "mdc-drawer-app-content",
                children: [
                    appBar,
                    Main({
                        class: "main-content",
                        id: "main-content",
                        children: [
                            Div({
                                class: "mdc-top-app-bar--fixed",
                                children: [body]
                            })
                        ]
                    })

                ]
            })
        ]
    })
}