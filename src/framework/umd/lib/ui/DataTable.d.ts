import './table.css';
import { StatefulWidget } from '../tikiti/index';
declare const _default: (props?: any) => _DataTable;
export default _default;
declare class _DataTable extends StatefulWidget {
    constructor(props: any);
    handleChange(e: Event): void;
    filterTable(query: string): void;
    goToPage(params: any): void;
    render(): HTMLElement;
}
