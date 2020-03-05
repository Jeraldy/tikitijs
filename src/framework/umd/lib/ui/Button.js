"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = require("../core/Button");
const TextView_1 = require("../core/TextView");
const style = {
    width: '100px',
    height: '30px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    outline: 'none',
    backgroundColor: '#E6E6E6',
};
const btn = (props = {}) => {
    props.style = Object.assign({}, style, props.style);
    props.children = [props.label ? TextView_1.default(props.label) : null, props.icon || null];
    delete props.label;
    return Button_1.default(Object.assign({}, props));
};
exports.default = btn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3VpL0J1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUFvQztBQUNwQywrQ0FBd0M7QUFFeEMsTUFBTSxLQUFLLEdBQUc7SUFDWixLQUFLLEVBQUUsT0FBTztJQUNkLE1BQU0sRUFBRSxNQUFNO0lBQ2QsWUFBWSxFQUFFLEtBQUs7SUFDbkIsTUFBTSxFQUFFLGdCQUFnQjtJQUN4QixNQUFNLEVBQUUsU0FBUztJQUNqQixPQUFPLEVBQUUsTUFBTTtJQUNmLGVBQWUsRUFBRSxTQUFTO0NBQzNCLENBQUM7QUFFRixNQUFNLEdBQUcsR0FBRyxDQUFDLFFBQWEsRUFBRSxFQUFFLEVBQUU7SUFDOUIsS0FBSyxDQUFDLEtBQUsscUJBQVEsS0FBSyxFQUFLLEtBQUssQ0FBQyxLQUFLLENBQUUsQ0FBQztJQUMzQyxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsa0JBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDO0lBQ2xGLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztJQUNuQixPQUFPLGdCQUFNLG1CQUNSLEtBQUssRUFDUixDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsa0JBQWUsR0FBRyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJ1dHRvbiBmcm9tICcuLi9jb3JlL0J1dHRvbic7XHJcbmltcG9ydCBUZXh0VmlldyBmcm9tICcuLi9jb3JlL1RleHRWaWV3JztcclxuXHJcbmNvbnN0IHN0eWxlID0ge1xyXG4gIHdpZHRoOiAnMTAwcHgnLFxyXG4gIGhlaWdodDogJzMwcHgnLFxyXG4gIGJvcmRlclJhZGl1czogJzVweCcsXHJcbiAgYm9yZGVyOiAnMXB4IHNvbGlkICNjY2MnLFxyXG4gIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gIG91dGxpbmU6ICdub25lJyxcclxuICBiYWNrZ3JvdW5kQ29sb3I6ICcjRTZFNkU2JyxcclxufTtcclxuXHJcbmNvbnN0IGJ0biA9IChwcm9wczogYW55ID0ge30pID0+IHtcclxuICBwcm9wcy5zdHlsZSA9IHsgLi4uc3R5bGUsIC4uLnByb3BzLnN0eWxlIH07XHJcbiAgcHJvcHMuY2hpbGRyZW4gPSBbcHJvcHMubGFiZWwgPyBUZXh0Vmlldyhwcm9wcy5sYWJlbCkgOiBudWxsLCBwcm9wcy5pY29uIHx8IG51bGxdO1xyXG4gIGRlbGV0ZSBwcm9wcy5sYWJlbDtcclxuICByZXR1cm4gQnV0dG9uKHtcclxuICAgIC4uLnByb3BzLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnRuO1xyXG4iXX0=