import Div from "../core/Div";

export default (params: any) => {
    //@ts-ignore
    let { width, sideMenu, ...props } = { ...params }
    return Div({
        class: "sidenav",
        style: { width },
        children: [sideMenu || null],
        ...props
    })
}

