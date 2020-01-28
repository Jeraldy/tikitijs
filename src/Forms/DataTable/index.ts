import Table from '../../Core/Table';
import { Install } from './init';
import DaTaTableHead from './DataTableHead';
import DaTaTableBody from './DataTableBody';
import './index.css';
import Div from '../../Core/Div';
import TextInput from '../../Core/TextInput';

interface Params {
    head?: DaTaTableHead;
    body?: DaTaTableBody;
}

export default class DataTable {
    node: any;
    searchInput: any;
    table: any;
    constructor(params?: Params) {
        //Install();
        this.searchInput = TextInput({
            placeholder: "Search",
            style:"float:right; padding: 8px; border: 1px solid #ccc;width:200px;border-radius:5px;margin-bottom:5px;outline: none;",
        })

        this.table = Table({
            class: "display card",
            id: "dt_products",
            children: [
                params ? params.head || null : null,
                params ? params.body || null : null
            ]
        })

        this.node = Div({
            style: 'overflow-x:auto;',
            children: [
                this.searchInput,
                this.table
            ]
        })
        this.searchInput.onkeyup = () => this.search(this.table, this.searchInput);
        return this.node
    }

    private search(table: any, input: any) {
        var filter, tr, td, i, txtValue;
        filter = input.value.toUpperCase();
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}
