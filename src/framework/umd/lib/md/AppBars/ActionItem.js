"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = require("../../core/Button");
const TextView_1 = require("../../core/TextView");
exports.default = (_a) => {
    var { icon } = _a, props = __rest(_a, ["icon"]);
    return Button_1.default(Object.assign({ class: "mdc-icon-button material-icons mdc-top-app-bar__action-item--unbounded", children: [
            TextView_1.default(icon)
        ] }, props));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0aW9uSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tZC9BcHBCYXJzL0FjdGlvbkl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBc0M7QUFDdEMsa0RBQTBDO0FBRzFDLGtCQUFlLENBQUMsRUFBZ0QsRUFBRSxFQUFFO1FBQXBELEVBQUUsSUFBSSxPQUEwQyxFQUF4Qyw0QkFBUTtJQUM1QixPQUFPLGdCQUFNLGlCQUNULEtBQUssRUFBRSx3RUFBd0UsRUFDL0UsUUFBUSxFQUFFO1lBQ04sa0JBQVEsQ0FBQyxJQUFJLENBQUM7U0FDakIsSUFDRSxLQUFLLEVBQ1YsQ0FBQTtBQUNOLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCdXR0b24gZnJvbSBcIi4uLy4uL2NvcmUvQnV0dG9uXCJcclxuaW1wb3J0IFRleHRWaWV3IGZyb20gXCIuLi8uLi9jb3JlL1RleHRWaWV3XCJcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCAoeyBpY29uLCAuLi5wcm9wcyB9OiB7IGljb246IHN0cmluZywgcHJvcHM6IGFueSB9KSA9PiB7XHJcbiAgICByZXR1cm4gQnV0dG9uKHtcclxuICAgICAgICBjbGFzczogXCJtZGMtaWNvbi1idXR0b24gbWF0ZXJpYWwtaWNvbnMgbWRjLXRvcC1hcHAtYmFyX19hY3Rpb24taXRlbS0tdW5ib3VuZGVkXCIsXHJcbiAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgVGV4dFZpZXcoaWNvbilcclxuICAgICAgICBdLFxyXG4gICAgICAgIC4uLnByb3BzXHJcbiAgICB9KVxyXG59XHJcblxyXG4iXX0=