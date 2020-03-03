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

enum DIMS {
    SIZE = 10
}

class _Table extends StatefulWidget {
    constructor(props: any) {
        super(props)
        this.state = { ...this.props, query: '' }
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
        this.setState({ data: _data, query })
    }

    render() {
        return Div({
            children: [
                TableHeader({ filter: (e: Event) => this.filterTable(e), query: this.state.query }),
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
                                    children: this.state.data.slice(0, DIMS.SIZE).map((row: any) =>
                                        Tr({
                                            class: "data-table-row",
                                            children: row.map((v: any) => TD(v))
                                        }),
                                    )
                                })
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