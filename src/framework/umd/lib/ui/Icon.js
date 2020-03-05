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
const I_1 = require("../core/I");
const TextView_1 = require("../core/TextView");
exports.default = (props) => {
    // @ts-ignore
    const _a = Object.assign({}, props), { name } = _a, other = __rest(_a, ["name"]);
    return I_1.default(Object.assign({ class: 'material-icons', children: [TextView_1.default(name)] }, other));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSWNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91aS9JY29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsaUNBQTBCO0FBQzFCLCtDQUF3QztBQUV4QyxrQkFBZSxDQUFDLEtBQVUsRUFBRSxFQUFFO0lBQzVCLGFBQWE7SUFDYixNQUFNLDZCQUFpQyxFQUFqQyxFQUFFLElBQUksT0FBMkIsRUFBekIsNEJBQXlCLENBQUM7SUFDeEMsT0FBTyxXQUFDLGlCQUNOLEtBQUssRUFBRSxnQkFBZ0IsRUFDdkIsUUFBUSxFQUFFLENBQUMsa0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUN2QixLQUFLLEVBQ1IsQ0FBQztBQUNMLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJIGZyb20gJy4uL2NvcmUvSSc7XHJcbmltcG9ydCBUZXh0VmlldyBmcm9tICcuLi9jb3JlL1RleHRWaWV3JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChwcm9wczogYW55KSA9PiB7XHJcbiAgLy8gQHRzLWlnbm9yZVxyXG4gIGNvbnN0IHsgbmFtZSwgLi4ub3RoZXIgfSA9IHsgLi4ucHJvcHMgfTtcclxuICByZXR1cm4gSSh7XHJcbiAgICBjbGFzczogJ21hdGVyaWFsLWljb25zJyxcclxuICAgIGNoaWxkcmVuOiBbVGV4dFZpZXcobmFtZSldLFxyXG4gICAgLi4ub3RoZXIsXHJcbiAgfSk7XHJcbn07XHJcbiJdfQ==