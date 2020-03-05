"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("./Node");
exports.default = (props) => {
    var value = props.value;
    if (value) {
        delete props.value;
        var node = Node_1.default(props, 'select');
        //@ts-ignore
        node.value = value;
        return node;
    }
    return Node_1.default(props, 'select');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJvcERvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9Ecm9wRG93bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUEwQjtBQUUxQixrQkFBZSxDQUFDLEtBQVUsRUFBRSxFQUFFO0lBQzVCLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDeEIsSUFBSSxLQUFLLEVBQUU7UUFDVCxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDbkIsSUFBSSxJQUFJLEdBQUcsY0FBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNqQyxZQUFZO1FBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELE9BQU8sY0FBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMvQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTm9kZSBmcm9tICcuL05vZGUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKHByb3BzOiBhbnkpID0+IHtcclxuICB2YXIgdmFsdWUgPSBwcm9wcy52YWx1ZTtcclxuICBpZiAodmFsdWUpIHtcclxuICAgIGRlbGV0ZSBwcm9wcy52YWx1ZTtcclxuICAgIHZhciBub2RlID0gTm9kZShwcm9wcywgJ3NlbGVjdCcpO1xyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBub2RlLnZhbHVlID0gdmFsdWU7XHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9XHJcbiAgcmV0dXJuIE5vZGUocHJvcHMsICdzZWxlY3QnKTtcclxufTtcclxuIl19