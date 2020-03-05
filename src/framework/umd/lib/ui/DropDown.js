"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DropDown_1 = require("../core/DropDown");
const style = {
    minWidth: '150px',
    minHeight: '30px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    outline: 'none',
    backgroundColor: '#E6E6E6',
};
exports.default = (props = {}) => {
    props.style = Object.assign({}, style, props.style);
    return DropDown_1.default(Object.assign({}, props));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJvcERvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdWkvRHJvcERvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQ0FBd0M7QUFFeEMsTUFBTSxLQUFLLEdBQUc7SUFDWixRQUFRLEVBQUUsT0FBTztJQUNqQixTQUFTLEVBQUUsTUFBTTtJQUNqQixZQUFZLEVBQUUsS0FBSztJQUNuQixNQUFNLEVBQUUsZ0JBQWdCO0lBQ3hCLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLE9BQU8sRUFBRSxNQUFNO0lBQ2YsZUFBZSxFQUFFLFNBQVM7Q0FDM0IsQ0FBQztBQUVGLGtCQUFlLENBQUMsUUFBYSxFQUFFLEVBQUUsRUFBRTtJQUNqQyxLQUFLLENBQUMsS0FBSyxxQkFBUSxLQUFLLEVBQUssS0FBSyxDQUFDLEtBQUssQ0FBRSxDQUFDO0lBQzNDLE9BQU8sa0JBQVEsbUJBQ1YsS0FBSyxFQUNSLENBQUM7QUFDTCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRHJvcERvd24gZnJvbSAnLi4vY29yZS9Ecm9wRG93bic7XHJcblxyXG5jb25zdCBzdHlsZSA9IHtcclxuICBtaW5XaWR0aDogJzE1MHB4JyxcclxuICBtaW5IZWlnaHQ6ICczMHB4JyxcclxuICBib3JkZXJSYWRpdXM6ICc1cHgnLFxyXG4gIGJvcmRlcjogJzFweCBzb2xpZCAjY2NjJyxcclxuICBjdXJzb3I6ICdwb2ludGVyJyxcclxuICBvdXRsaW5lOiAnbm9uZScsXHJcbiAgYmFja2dyb3VuZENvbG9yOiAnI0U2RTZFNicsXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCAocHJvcHM6IGFueSA9IHt9KSA9PiB7XHJcbiAgcHJvcHMuc3R5bGUgPSB7IC4uLnN0eWxlLCAuLi5wcm9wcy5zdHlsZSB9O1xyXG4gIHJldHVybiBEcm9wRG93bih7XHJcbiAgICAuLi5wcm9wcyxcclxuICB9KTtcclxufTtcclxuIl19