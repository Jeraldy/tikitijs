"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (props = {}, tag) => {
    var node = document.createElement(tag);
    //@ts-ignore
    if (props.children) {
        //@ts-ignore
        props.children.forEach(child => {
            if (child !== null) {
                node.appendChild(child);
            }
        });
        //@ts-ignore
        delete props.children;
    }
    var style = '';
    //@ts-ignore
    if (props.style) {
        //@ts-ignore
        var _style = props.style;
        for (var key in _style) {
            style += resolveCamelCase(key) + ':' + _style[key] + ';';
        }
        //@ts-ignore
        props.style = style;
    }
    for (var key of Object.keys(props)) {
        //@ts-ignore
        if (typeof props[key] === 'function') {
            //@ts-ignore
            if (props[key] !== null) {
                //@ts-ignore
                node[key] = props[key];
            }
        }
        else {
            //@ts-ignore
            node.setAttribute(key, props[key]);
        }
    }
    //node.setAttribute("id", Math.random().toString(36))
    return node;
};
function resolveCamelCase(key) {
    return key.replace(/([A-Z])/g, '-$1').toLowerCase();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL05vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQkFBZSxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUUsR0FBVyxFQUFFLEVBQUU7SUFDekMsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUV2QyxZQUFZO0lBQ1osSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO1FBQ2xCLFlBQVk7UUFDWixLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM3QixJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILFlBQVk7UUFDWixPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUM7S0FDdkI7SUFFRCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDZixZQUFZO0lBQ1osSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO1FBQ2YsWUFBWTtRQUNaLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDekIsS0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLEVBQUU7WUFDdEIsS0FBSyxJQUFJLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQzFEO1FBQ0QsWUFBWTtRQUNaLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0tBQ3JCO0lBRUQsS0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2xDLFlBQVk7UUFDWixJQUFJLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFVBQVUsRUFBRTtZQUNwQyxZQUFZO1lBQ1osSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUN2QixZQUFZO2dCQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDeEI7U0FDRjthQUFNO1lBQ0wsWUFBWTtZQUNaLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3BDO0tBQ0Y7SUFDRCxxREFBcUQ7SUFDckQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQUM7QUFFRixTQUFTLGdCQUFnQixDQUFDLEdBQVE7SUFDaEMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUN0RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgKHByb3BzID0ge30sIHRhZzogc3RyaW5nKSA9PiB7XHJcbiAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcblxyXG4gIC8vQHRzLWlnbm9yZVxyXG4gIGlmIChwcm9wcy5jaGlsZHJlbikge1xyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBwcm9wcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgaWYgKGNoaWxkICE9PSBudWxsKSB7XHJcbiAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBkZWxldGUgcHJvcHMuY2hpbGRyZW47XHJcbiAgfVxyXG5cclxuICB2YXIgc3R5bGUgPSAnJztcclxuICAvL0B0cy1pZ25vcmVcclxuICBpZiAocHJvcHMuc3R5bGUpIHtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgdmFyIF9zdHlsZSA9IHByb3BzLnN0eWxlO1xyXG4gICAgZm9yICh2YXIga2V5IGluIF9zdHlsZSkge1xyXG4gICAgICBzdHlsZSArPSByZXNvbHZlQ2FtZWxDYXNlKGtleSkgKyAnOicgKyBfc3R5bGVba2V5XSArICc7JztcclxuICAgIH1cclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgcHJvcHMuc3R5bGUgPSBzdHlsZTtcclxuICB9XHJcblxyXG4gIGZvciAodmFyIGtleSBvZiBPYmplY3Qua2V5cyhwcm9wcykpIHtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgaWYgKHR5cGVvZiBwcm9wc1trZXldID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICBpZiAocHJvcHNba2V5XSAhPT0gbnVsbCkge1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIG5vZGVba2V5XSA9IHByb3BzW2tleV07XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIHByb3BzW2tleV0pO1xyXG4gICAgfVxyXG4gIH1cclxuICAvL25vZGUuc2V0QXR0cmlidXRlKFwiaWRcIiwgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikpXHJcbiAgcmV0dXJuIG5vZGU7XHJcbn07XHJcblxyXG5mdW5jdGlvbiByZXNvbHZlQ2FtZWxDYXNlKGtleTogYW55KSB7XHJcbiAgcmV0dXJuIGtleS5yZXBsYWNlKC8oW0EtWl0pL2csICctJDEnKS50b0xvd2VyQ2FzZSgpO1xyXG59XHJcbiJdfQ==