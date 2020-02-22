import { actions } from '../reducers/counter';
import { updateState, dispatch } from '../store';
import { StatefulWidget } from "../../framework/tikiti/index";
import Button from '../../framework/ui/Button';
import Div from '../../framework/core/Div';
import Icon from '../../framework/ui/Icon';
import DataTable from '../../framework/ui/DataTable';
import SIZE from '../../framework/utils/Size';
const { increment } = actions

class Increment extends StatefulWidget {
    constructor() {
        super()
        this.data = []
        this.state = { name: 'Increment' }
        return this.connect()
    }

    mapStoreToState(state) {
        return { ...state.counter, ...state.data }
    }

    componentDidMount() {
        updateState(this)
    }

    removeFromTable(id) {
        // this.setState({
        //     data: this.data.filter(a => a[0] != id)
        // })
    }

    prettyData(data) {
        return data.map((row) => [
            row.id,
            row.name,
            row.username,
            row.website,
            row.phone,
            row.email,
            this.action(row.id)
        ])
    }

    action(id) {
        return Button({
            class: 'parent',
            icon: Icon({ name: 'more_vert', style: { color: 'gray' } }),
            onclick: () => this.removeFromTable(id),
            style: {
                width: 'auto',
                backgroundColor: 'transparent',
                border: 'none'
            }
        })
    }
    render() {
        const { data, name, value } = { ...this.state }
        var _data = data ? this.prettyData(data) : []
 
        return Div({
            children: [
                Button({
                    label: `${name} ${value}`,
                    onclick: () => dispatch(increment())
                }),
                DataTable({
                    titles: [
                        { title: '#', style: { width: SIZE._10px } },
                        { title: 'NAME' },
                        { title: 'USERNAME' },
                        { title: 'WEBSITE' },
                        { title: 'PHONE' },
                        { title: 'EMAIL' },
                        { title: '', style: { width: SIZE._2px } }
                    ],
                    data: _data
                })
            ]
        })
    }
}

export default Increment;