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

export default (props: any = {}) => {
    return new JTable(props)
}

class JTable extends Tikiti {
    constructor(props: any) {
        super()
        this.state = { ...props }
        console.log(this.state)
        return this.connect()
    }

    search(e: Event) {
        var _data: any[] = [];
        console.log(this.state)
        // this.props.data.forEach((row: any) => {
        //     console.log(row)
        //     for (var j = 0; j < row.length; j++) {
        //         if (typeof row[j] != 'object') {
        //             //@ts-ignore
        //             if (row[j].includes(e.target.value)) {
        //                 _data.push(row)
        //                 break
        //             }
        //         }
        //     }
        // })
        // this.setState({
        //     data: _data
        // })
    }

    render() {
        //@ts-ignore
        let { id, titles, data, ...rest } = { ...this.state }
        id = id || Math.random()
        id = `dt_${id}`
        titles = titles || []
        data = data || []

        var thead: any[] = []
        var tbody: any[] = []
        var _tr: any[] = []

        titles.forEach((_p: any = {}) => {
            const title = _p.title || ''
            delete _p.title
            _tr.push(
                Th({
                    ..._p,
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
                        id: Math.random(),
                        children: [typeof d === 'object' ? d : TextView(d)]
                    })
                )
            });
            tbody.push(Tr({ children: tr, id: Math.random(), }))
        });


        return Div({
            style: {
                overflowX: 'auto'
            },
            children: [
                TextField({
                    placeholder: "Search",
                    style: {
                        float: 'right',
                        padding: '8px',
                        marginBottom: '5px',
                    },
                    onkeyup: (e: Event) => this.search(e)
                }),
                Table({
                    ...rest,
                    class: 'table table-bordered table-condensed',
                    children: [
                        Thead({ children: thead, style: { backgroundColor: '#E6E6E6' } }),
                        Tbody({ children: tbody })
                    ]
                })
            ]
        })
    }
}