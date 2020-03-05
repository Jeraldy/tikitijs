import _Table from './_Table';

export default ({ data, titles, actions }:
    { data: Array<Array<any>>, titles: Array<{ title: string, style: any }>, actions: Array<any> }) => {
    return new _Table({ data, titles, actions })
}
