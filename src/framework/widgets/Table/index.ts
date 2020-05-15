import _Table from './_Table';
import './style.css';

export default ({ data, titles, actions,title }:
    { data: Array<Array<any>>, titles: Array<{ title: string, style: any }>, actions: Array<any>,title: string }) => {
    return new _Table({ data, titles, actions,title })
}
