import { StatefulWidget } from "../../tikiti/index";
import Table from "../../core/Table";
import Thead from "../../core/Thead";
import Tr from "../../core/Tr";
import Tbody from "../../core/Tbody";
import TextView from "../../core/TextView";
import Td from "../../core/Td";
import TableHeader from "./TableHeader";
import Divider from "../Divider/index";
import Div from "../../core/Div";
import Section from "../../core/Section";
import Footer from "../../core/Footer";
import Span from "../../core/Span";
import ActionItem from "../AppBars/ActionItem";

enum DIMS {
    SIZE = 10
}

class _Table extends StatefulWidget {
    constructor(props: any) {
        super(props)
        this.state = { ...this.props, query: '', start: 0 }
        this.filterTable = this.filterTable.bind(this)
        return this.connect()
    }

    filterTable(e: Event) {
        var _data: any[] = [];
        //@ts-ignore
        let query = e.target.value
        //@ts-ignore
        this.props.data.forEach((row: any) => {
            for (var j = 0; j < row.length; j++) {
                if (typeof row[j] != 'object') {
                    if (row[j].toString().toLowerCase().includes(query.toLowerCase())) {
                        _data.push(row)
                        break
                    }
                }
            }
        })
        this.setState({ data: _data, query }, e)
    }

    nextData() {
        let start = this.state.start + DIMS.SIZE
        let end = start + DIMS.SIZE
        let data = this.state.data.slice(start, end)
        if (data.length > 0) {
            this.setState({ start })
        }
    }

    prevData() {
        let start = this.state.start - DIMS.SIZE
        let end = start - DIMS.SIZE
        let data = this.state.data.slice(start, end)
        if (data.length > 0) {
            this.setState({ start })
        }
    }

    render() {
        const data = this.state.data.slice(this.state.start, this.state.start + DIMS.SIZE);
        return Section({
            class: "md-ui component-data-table",
            children: [
                TableHeader({
                    filter: (e: Event) => this.filterTable(e),
                    query: this.state.query,
                    actions: [...this.state.actions]
                }),
                Divider({ style: { backgroundColor: '#e0e0e0' } }),
                Div({
                    class: "main-table-wrapper",
                    children: [
                        Table({
                            class: "main-table-content",
                            children: [
                                Thead({
                                    class: "data-table-header",
                                    children: [
                                        Tr({
                                            class: "data-table-row",
                                            children: this.state.titles.map((v: any) => TD(v.title, v.style))
                                        })
                                    ]
                                }),
                                Tbody({
                                    class: "data-table-content",
                                    children: data.map((row: any) =>
                                        Tr({
                                            class: "data-table-row",
                                            children: row.map((v: any) => TD(v))
                                        }),
                                    )
                                })
                            ]
                        })
                    ]
                }),
                Footer({
                    class: "main-table-footer",
                    children: [
                        // Span({
                        //     class: "rows-selection",
                        //     children: [
                        //         Span({ class: "rows-selection-label", children: [TextView("Rows per page:")] }),
                        //         Span({
                        //             class: "rows-selection-dropdown",
                        //             children: [
                        //                 TextView("10"),
                        //                 Icon({ name: "arrow_drop_down" })
                        //             ]
                        //         })
                        //     ]
                        // }),
                        Span({
                            class: "rows-amount",
                            //@ts-ignore
                            children: [TextView(`Showing: ${this.state.start + 1}-${data.length + this.state.start} of ${this.props.data.length}`)]
                        }),
                        Span({
                            class: "table-pagination",
                            children: [
                                ActionItem({
                                    icon: "keyboard_arrow_left",
                                    props: {
                                        onclick: () => this.prevData()
                                    }
                                }),
                                ActionItem({
                                    icon: "keyboard_arrow_right",
                                    props: {
                                        onclick: () => this.nextData()
                                    }
                                }),
                            ]
                        })
                    ]
                })
            ]
        })

    }
}

function TD(title: string, style?: any) {
    return Td({ children: [TextView(title)], style })
}

export default _Table;