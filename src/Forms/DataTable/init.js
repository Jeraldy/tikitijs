import Node from '../../Core/Node';
import $ from 'jquery';
import dt from 'datatables.net';
window.jQuery = $;
window.$ = $;

export const Install = () => {
    // var css = Node({
    //     rel: "stylesheet",
    //     href: "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.css"
    // }, 'link')
    // document.head.appendChild(css)

    var css2 = Node({
        rel: "stylesheet",
        href: "https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css"
    }, 'link')
    document.head.appendChild(css2)

    // var bootstrap = Node({
    //     src:"https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js",
    // },'script')
    // document.body.appendChild(bootstrap)
}

export function initScript(id) {
    document.addEventListener("DOMContentLoaded", function (event) {
        window['dt_' + id] = $('#' + 'dt_' + id + '').DataTable();
        // $('#dtable_customer_wrapper').find('div:first').remove();
        // $("#searchbox").on("keyup search input paste cut", function () {
        //     dtable_customer.search(this.value).draw();
        // });
    });
}