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
import Tikiti from "../tikiti/index"
import Link from "../core/Link"
import Icon from "./Icon"

export default (props: any = {}) => {
    return new JTable(props)
}

var table_data: any[] = []
class JTable extends Tikiti {

    constructor(props: any) {
        super()
        table_data = props.data || []
        this.state = { ...props, query: '', start: 0, end: 3 }
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
        table_data.forEach((row: any) => {
            for (var j = 0; j < row.length; j++) {
                if (typeof row[j] != 'object') {
                    if (row[j].toString().toLowerCase().includes(query)) {
                        _data.push(row)
                        break
                    }
                }
            }
        })
        this.setState({
            data: _data
        })
    }

    goToPage(params: any) {
        this.setState({
            data: []//table_data.slice(params.start, params.end)
        })
    }

    render() {
        //@ts-ignore
        let { id, titles, data, query, start, end, ...rest } = { ...this.state }
        console.log(data.length)
        id = id || Math.random()
        id = `dt_${id}`
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

        thead.push(Tr({ children: _tr, id: Math.random(), }))

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
            tbody.push(Tr({ children: tr, id: Math.random(), }))
        });


        return Div({
            style: {
                overflowX: 'auto',
                border: '1px solid #ccc',
                padding: '5px',
                borderRadius: '2px',
                boxShadow: '-3px 3px 3px -3px rgba(0,0,0,.5)'
            },
            children: [
                Div({
                    class: 'search-container',
                    style: {
                        float: 'right',
                    },
                    children: [
                        Icon({
                            name: 'search',
                            style:{
                                position: 'relative',
                                top:'5px',
                                color:'#ccc'
                            }
                        }),
                        TextField({
                            placeholder: "Search",
                            style: {
                                border: 'hidden',
                                height: '10px',
                                position:'relative',
                                top:'-5px'
                            },
                            value: query,
                            onkeyup: (e: Event) => this.handleChange(e)
                        }),
                    ]
                }),
                Table({
                    ...rest,
                    children: [
                        Thead({ children: thead, 
                            style: { 
                            backgroundColor: '#EEF1F4',
                            fontSize:'12px',
                            color:'#757575',
                            fontFamily:'Lucida Console'
                        } }),
                        Tbody({ children: tbody })
                    ]
                }),
                FilterInfo(),
                Pagination({
                    size: 3,
                    goToPage: (params: any) => this.goToPage(params)
                })
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
            TextView("Showing 3 out of 10")
        ]
    })
}

function Pagination(params?: any) {
    //@ts-ignore
    let { len, size, goToPage } = { len: table_data.length, ...params }
    const numPages = Math.floor(len / size) + len % size;
    let pages = []
    let start = 0
    let end = size
    for (var i = 0; i < numPages; i++) {
        pages.push(Page({ goToPage, start, end, counter: i }))
        start = end + 1
        end = start + size
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
                }
            })
        ]
    })
}

function Page(params: any) {
    return Link({
        href: "#",
        onclick: (e: Event) => {
            params.goToPage({
                start: params.start,
                end: params.end
            }),
                //@ts-ignore
                e.target.classList.add('active')
        },
        children: [
            TextView(params.counter + 1)
        ]
    })
}