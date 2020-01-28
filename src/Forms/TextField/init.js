import { MDCTextField } from '@material/textfield';

export default (id) => {
    document.addEventListener("DOMContentLoaded", function (event) {
        new MDCTextField(document.querySelector("." + id));
    });
}