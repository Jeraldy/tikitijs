"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RadioButton_1 = require("../core/RadioButton");
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
    return RadioButton_1.default(Object.assign({}, props));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFkaW9CdXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdWkvUmFkaW9CdXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBOEM7QUFFOUMsTUFBTSxLQUFLLEdBQUc7SUFDWixRQUFRLEVBQUUsTUFBTTtJQUNoQixTQUFTLEVBQUUsTUFBTTtJQUNqQixZQUFZLEVBQUUsS0FBSztJQUNuQixNQUFNLEVBQUUsZ0JBQWdCO0lBQ3hCLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLE9BQU8sRUFBRSxNQUFNO0NBQ2hCLENBQUM7QUFFRixrQkFBZSxDQUFDLFFBQWEsRUFBRSxFQUFFLEVBQUU7SUFDakMsS0FBSyxDQUFDLEtBQUsscUJBQVEsS0FBSyxFQUFLLEtBQUssQ0FBQyxLQUFLLENBQUUsQ0FBQztJQUMzQyxPQUFPLHFCQUFXLG1CQUNiLEtBQUssRUFDUixDQUFDO0FBQ0wsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJhZGlvQnV0dG9uIGZyb20gJy4uL2NvcmUvUmFkaW9CdXR0b24nO1xyXG5cclxuY29uc3Qgc3R5bGUgPSB7XHJcbiAgbWluV2lkdGg6ICcyMHB4JyxcclxuICBtaW5IZWlnaHQ6ICcyMHB4JyxcclxuICBib3JkZXJSYWRpdXM6ICc1cHgnLFxyXG4gIGJvcmRlcjogJzFweCBzb2xpZCAjY2NjJyxcclxuICBjdXJzb3I6ICdwb2ludGVyJyxcclxuICBvdXRsaW5lOiAnbm9uZScsXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCAocHJvcHM6IGFueSA9IHt9KSA9PiB7XHJcbiAgcHJvcHMuc3R5bGUgPSB7IC4uLnN0eWxlLCAuLi5wcm9wcy5zdHlsZSB9O1xyXG4gIHJldHVybiBSYWRpb0J1dHRvbih7XHJcbiAgICAuLi5wcm9wcyxcclxuICB9KTtcclxufTtcclxuIl19