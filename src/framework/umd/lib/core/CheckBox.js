"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("./Node");
exports.default = (props) => {
    props.type = 'checkbox';
    if (!props.checked) {
        delete props.checked;
    }
    return Node_1.default(props, 'input');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tCb3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9DaGVja0JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUEwQjtBQUUxQixrQkFBZSxDQUFDLEtBQVUsRUFBRSxFQUFFO0lBQzVCLEtBQUssQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO0lBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO1FBQ2xCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQztLQUN0QjtJQUNELE9BQU8sY0FBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM5QixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTm9kZSBmcm9tICcuL05vZGUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKHByb3BzOiBhbnkpID0+IHtcclxuICBwcm9wcy50eXBlID0gJ2NoZWNrYm94JztcclxuICBpZiAoIXByb3BzLmNoZWNrZWQpIHtcclxuICAgIGRlbGV0ZSBwcm9wcy5jaGVja2VkO1xyXG4gIH1cclxuICByZXR1cm4gTm9kZShwcm9wcywgJ2lucHV0Jyk7XHJcbn07XHJcbiJdfQ==