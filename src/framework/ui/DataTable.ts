import Table from "../core/Table"
import Thead from "../core/Thead"
import Th from "../core/Th"
import TextView from "../core/TextView"
import Tbody from "../core/Tbody"
import Td from "../core/Td"
import Tr from "../core/Tr"
import './table.css';
import Div from "../core/Div"
import TextField from "./TextField"
import { StatefulWidget } from "../tikiti/index"
import Link from "../core/Link"
import Icon from "./Icon"
import Button from "../core/Button"
import { genId } from "./utils"

export default (props: any = {}) => {
    return new _DataTable(props)
}

enum DIMS {
    SIZE = 10
}

let DATA: any[] = []

class _DataTable extends StatefulWidget {

    constructor(props: any) {
        super()
        // console.log(props)
        DATA = props.data || []
        this.state = {
            ...props,
            query: '',
            data: DATA.slice(0, DIMS.SIZE)
        }
      
        return this.connect()
    }

    handleChange(e: Event) {
        this.setState({
            //@ts-ignore
            query: e.target.value
        }).then((state) => {
            this.filterTable(state.query.toLowerCase())
        })
    }

    filterTable(query: string) {
        var _data: any[] = [];
        DATA.forEach((row: any) => {
            for (var j = 0; j < row.length; j++) {
                if (typeof row[j] != 'object') {
                    if (row[j].toString().toLowerCase().includes(query)) {
                        _data.push(row)
                        break
                    }
                }
            }
        })
        this.setState({ data: _data.slice(0, DIMS.SIZE) })
    }

    goToPage(params: any) {
        this.setState({ data: DATA.slice(params.start, params.end) })
    }

    render() {
        //@ts-ignore
        let { id, titles, data, query, ...rest } = { ...this.state }
        id = id || Math.random()
        titles = titles || []
        data = data || []

        var thead: any[] = []
        var tbody: any[] = []
        var _tr: any[] = []

        titles.forEach((titleObject: any = {}) => {
            //@ts-ignore
            let { title, ...otherAttrs } = { ...titleObject }
            title = title || ''
            _tr.push(
                Th({
                    ...otherAttrs,
                    children: [
                        typeof title === 'object' ? title : TextView(title)
                    ]
                })
            )
        });

        thead.push(Tr({ children: _tr, id: genId() }))
        data.forEach((row: any) => {
            var tr: any[] = []
            row.forEach((d: any) => {
                d = d || ''
                tr.push(
                    Td({
                        children: [typeof d === 'object' ? d : TextView(d)]
                    })
                )
            });
            tbody.push(Tr({ children: tr, id: genId() }))
        });

        return Div({
            id: genId(),
            style: {
                overflowX: 'auto',
                border: '1px solid #ccc',
                padding: '5px',
                borderRadius: '2px',
                boxShadow: '-3px 3px 3px -3px rgba(0,0,0,.5)',
                backgroundColor: 'white',
                overflowY:'hidden'
            },
            children: [
                Div({
                    style: { height: '20px', fontSize: '20px' },
                    children: [
                        TextView(`Registered Customers`)
                    ]
                }),
                Div({
                    style: {
                        width: '100%',
                        border: '1px dashed #ccc',
                        marginTop: '5px',
                        marginBottom: '5px'
                    }
                }),
                Div({
                    children: [
                        Button({
                            children: [
                                Icon({
                                    name: 'add',
                                    style: {
                                        display: "inline-block",
                                        verticalAlign: 'middle'
                                    }
                                }),
                                TextView("Add New")
                            ],
                        }),
                        Div({
                            class: 'search-container',
                            style: {
                                float: 'right',
                            },
                            children: [
                                Icon({
                                    name: 'search',
                                    style: {
                                        position: 'relative',
                                        top: '5px',
                                        color: '#ccc'
                                    }
                                }),
                                TextField({
                                    placeholder: "Search",
                                    style: {
                                        border: 'hidden',
                                        height: '10px',
                                        position: 'relative',
                                        top: '-5px'
                                    },
                                    value: query,
                                    onkeyup: (e: Event) => this.handleChange(e)
                                }),
                            ]
                        }),
                    ]
                }),
                Table({
                    id,
                    ...rest,
                    children: [
                        Thead({
                            children: thead,
                            style: {
                                backgroundColor: '#EEF1F4',
                                fontSize: '12px',
                                color: '#757575',
                                fontFamily: 'Lucida Console'
                            }
                        }),
                        Tbody({ children: tbody })
                    ]
                }),
                FilterInfo(),
                Pagination({ goToPage: (params: any) => this.goToPage(params) })
            ]
        })
    }
}

function FilterInfo(params?: any) {
    return Div({
        style: {
            fontStyle: 'italic'
        },
        children: [
            TextView(`Showing ${DIMS.SIZE} out of ${DATA.length}`)
        ]
    })
}

function Pagination(params?: any) {
    //@ts-ignore
    let { len, goToPage } = { len: DATA.length, ...params }
    const numPages = Math.floor(len / DIMS.SIZE) + len % DIMS.SIZE;
    let pages = []
    let start = 0
    let end = DIMS.SIZE

    for (var i = 0; i < numPages; i++) {
        pages.push(Page({ goToPage, start, end, counter: i }))
        start = end
        end = start + DIMS.SIZE
    }

    return Div({
        class: 'pagination',
        style: {
            float: 'right',
            marginTop: '-15px',
        },
        children: [
            Link({
                href: "#",
                children: [
                    Icon({
                        name: 'navigate_before',
                        style: {
                            position: 'relative',
                            top: '-4px',
                        }
                    })
                ],
                style: {
                    height: '18px',
                    width: '15px'
                }
            }),
            ...pages,
            Link({
                href: "#",
                children: [
                    Icon({
                        name: 'navigate_next',
                        style: {
                            position: 'relative',
                            top: '-4px',
                        }
                    })
                ],
                style: {
                    height: '18px',
                    width: '15px'
                },
                onclick: () => {
                    if (start < DATA.length) {
                        //goToPage({ start: start, end: params.end })
                    }
                }
            })
        ]
    })
}

function Page(params: any) {
    return Link({
        href: "#",
        onclick: (e: Event) => params.goToPage({ start: params.start, end: params.end }),
        children: [TextView(params.counter + 1)],
        id: genId(),
    })
}