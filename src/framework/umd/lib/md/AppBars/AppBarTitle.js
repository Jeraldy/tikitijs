"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Span_1 = require("../../core/Span");
const TextView_1 = require("../../core/TextView");
exports.default = (title = '', props = {}) => {
    return Span_1.default(Object.assign({ class: "mdc-top-app-bar__title", children: [TextView_1.default(title)] }, props));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwQmFyVGl0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWQvQXBwQmFycy9BcHBCYXJUaXRsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUFrQztBQUNsQyxrREFBMEM7QUFFMUMsa0JBQWUsQ0FBQyxRQUFnQixFQUFFLEVBQUUsUUFBYSxFQUFFLEVBQUUsRUFBRTtJQUNuRCxPQUFPLGNBQUksaUJBQ1AsS0FBSyxFQUFFLHdCQUF3QixFQUMvQixRQUFRLEVBQUUsQ0FBQyxrQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQ3hCLEtBQUssRUFDVixDQUFBO0FBQ04sQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNwYW4gZnJvbSBcIi4uLy4uL2NvcmUvU3BhblwiXHJcbmltcG9ydCBUZXh0VmlldyBmcm9tIFwiLi4vLi4vY29yZS9UZXh0Vmlld1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCAodGl0bGU6IHN0cmluZyA9ICcnLCBwcm9wczogYW55ID0ge30pID0+IHtcclxuICAgIHJldHVybiBTcGFuKHtcclxuICAgICAgICBjbGFzczogXCJtZGMtdG9wLWFwcC1iYXJfX3RpdGxlXCIsXHJcbiAgICAgICAgY2hpbGRyZW46IFtUZXh0Vmlldyh0aXRsZSldLFxyXG4gICAgICAgIC4uLnByb3BzXHJcbiAgICB9KVxyXG59Il19