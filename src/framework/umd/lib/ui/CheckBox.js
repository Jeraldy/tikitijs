"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CheckBox_1 = require("../core/CheckBox");
const style = {
    minWidth: '20px',
    minHeight: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    outline: 'none',
};
exports.default = (props = {}) => {
    props.style = Object.assign({}, style, props.style);
    return CheckBox_1.default(Object.assign({}, props));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tCb3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdWkvQ2hlY2tCb3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQ0FBd0M7QUFFeEMsTUFBTSxLQUFLLEdBQUc7SUFDWixRQUFRLEVBQUUsTUFBTTtJQUNoQixTQUFTLEVBQUUsTUFBTTtJQUNqQixZQUFZLEVBQUUsS0FBSztJQUNuQixNQUFNLEVBQUUsZ0JBQWdCO0lBQ3hCLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLE9BQU8sRUFBRSxNQUFNO0NBQ2hCLENBQUM7QUFFRixrQkFBZSxDQUFDLFFBQWEsRUFBRSxFQUFFLEVBQUU7SUFDakMsS0FBSyxDQUFDLEtBQUsscUJBQVEsS0FBSyxFQUFLLEtBQUssQ0FBQyxLQUFLLENBQUUsQ0FBQztJQUMzQyxPQUFPLGtCQUFRLG1CQUNWLEtBQUssRUFDUixDQUFDO0FBQ0wsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENoZWNrQm94IGZyb20gJy4uL2NvcmUvQ2hlY2tCb3gnO1xyXG5cclxuY29uc3Qgc3R5bGUgPSB7XHJcbiAgbWluV2lkdGg6ICcyMHB4JyxcclxuICBtaW5IZWlnaHQ6ICcyMHB4JyxcclxuICBib3JkZXJSYWRpdXM6ICc1cHgnLFxyXG4gIGJvcmRlcjogJzFweCBzb2xpZCAjY2NjJyxcclxuICBjdXJzb3I6ICdwb2ludGVyJyxcclxuICBvdXRsaW5lOiAnbm9uZScsXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCAocHJvcHM6IGFueSA9IHt9KSA9PiB7XHJcbiAgcHJvcHMuc3R5bGUgPSB7IC4uLnN0eWxlLCAuLi5wcm9wcy5zdHlsZSB9O1xyXG4gIHJldHVybiBDaGVja0JveCh7XHJcbiAgICAuLi5wcm9wcyxcclxuICB9KTtcclxufTtcclxuIl19