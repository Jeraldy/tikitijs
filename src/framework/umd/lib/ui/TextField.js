"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TextInput_1 = require("../core/TextInput");
const style = {
    outline: 'none',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '8px',
};
exports.default = (props = {}) => {
    props.style = Object.assign({}, style, props.style);
    return TextInput_1.default(Object.assign({}, props));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dEZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3VpL1RleHRGaWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUEwQztBQUUxQyxNQUFNLEtBQUssR0FBRztJQUNaLE9BQU8sRUFBRSxNQUFNO0lBQ2YsTUFBTSxFQUFFLGdCQUFnQjtJQUN4QixZQUFZLEVBQUUsS0FBSztJQUNuQixPQUFPLEVBQUUsS0FBSztDQUNmLENBQUM7QUFFRixrQkFBZSxDQUFDLFFBQWEsRUFBRSxFQUFFLEVBQUU7SUFDakMsS0FBSyxDQUFDLEtBQUsscUJBQVEsS0FBSyxFQUFLLEtBQUssQ0FBQyxLQUFLLENBQUUsQ0FBQztJQUUzQyxPQUFPLG1CQUFTLG1CQUNYLEtBQUssRUFDUixDQUFDO0FBQ0wsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRleHRJbnB1dCBmcm9tICcuLi9jb3JlL1RleHRJbnB1dCc7XHJcblxyXG5jb25zdCBzdHlsZSA9IHtcclxuICBvdXRsaW5lOiAnbm9uZScsXHJcbiAgYm9yZGVyOiAnMXB4IHNvbGlkICNjY2MnLFxyXG4gIGJvcmRlclJhZGl1czogJzVweCcsXHJcbiAgcGFkZGluZzogJzhweCcsXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCAocHJvcHM6IGFueSA9IHt9KSA9PiB7XHJcbiAgcHJvcHMuc3R5bGUgPSB7IC4uLnN0eWxlLCAuLi5wcm9wcy5zdHlsZSB9O1xyXG5cclxuICByZXR1cm4gVGV4dElucHV0KHtcclxuICAgIC4uLnByb3BzLFxyXG4gIH0pO1xyXG59O1xyXG4iXX0=