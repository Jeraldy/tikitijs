"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Div_1 = require("../../core/Div");
const H3_1 = require("../../core/H3");
const TextView_1 = require("../../core/TextView");
const H6_1 = require("../../core/H6");
exports.default = (props) => {
    return Div_1.default(Object.assign({ class: "mdc-drawer__header" }, props));
};
function DrawerHeaderTitle(title) {
    return H3_1.default({
        class: "mdc-drawer__title",
        children: [
            TextView_1.default(title || '')
        ]
    });
}
exports.DrawerHeaderTitle = DrawerHeaderTitle;
function DrawerHeaderSubTitle(title) {
    return H6_1.default({
        class: "mdc-drawer__subtitle",
        children: [
            TextView_1.default(title || '')
        ]
    });
}
exports.DrawerHeaderSubTitle = DrawerHeaderSubTitle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJhd2VySGVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21kL0RyYXdlci9EcmF3ZXJIZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBZ0M7QUFDaEMsc0NBQThCO0FBQzlCLGtEQUEwQztBQUMxQyxzQ0FBOEI7QUFFOUIsa0JBQWUsQ0FBQyxLQUFVLEVBQUUsRUFBRTtJQUMxQixPQUFPLGFBQUcsaUJBQ04sS0FBSyxFQUFFLG9CQUFvQixJQUN4QixLQUFLLEVBQ1YsQ0FBQTtBQUNOLENBQUMsQ0FBQTtBQUVELFNBQWdCLGlCQUFpQixDQUFDLEtBQWE7SUFDM0MsT0FBTyxZQUFFLENBQUM7UUFDTixLQUFLLEVBQUUsbUJBQW1CO1FBQzFCLFFBQVEsRUFBRTtZQUNOLGtCQUFRLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztTQUN4QjtLQUNKLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFQRCw4Q0FPQztBQUVELFNBQWdCLG9CQUFvQixDQUFDLEtBQWE7SUFDOUMsT0FBTyxZQUFFLENBQUM7UUFDTixLQUFLLEVBQUUsc0JBQXNCO1FBQzdCLFFBQVEsRUFBRTtZQUNOLGtCQUFRLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztTQUN4QjtLQUNKLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFQRCxvREFPQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEaXYgZnJvbSBcIi4uLy4uL2NvcmUvRGl2XCJcclxuaW1wb3J0IEgzIGZyb20gXCIuLi8uLi9jb3JlL0gzXCJcclxuaW1wb3J0IFRleHRWaWV3IGZyb20gXCIuLi8uLi9jb3JlL1RleHRWaWV3XCJcclxuaW1wb3J0IEg2IGZyb20gXCIuLi8uLi9jb3JlL0g2XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChwcm9wczogYW55KSA9PiB7XHJcbiAgICByZXR1cm4gRGl2KHtcclxuICAgICAgICBjbGFzczogXCJtZGMtZHJhd2VyX19oZWFkZXJcIixcclxuICAgICAgICAuLi5wcm9wc1xyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIERyYXdlckhlYWRlclRpdGxlKHRpdGxlOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBIMyh7XHJcbiAgICAgICAgY2xhc3M6IFwibWRjLWRyYXdlcl9fdGl0bGVcIixcclxuICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICBUZXh0Vmlldyh0aXRsZSB8fCAnJylcclxuICAgICAgICBdXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRHJhd2VySGVhZGVyU3ViVGl0bGUodGl0bGU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIEg2KHtcclxuICAgICAgICBjbGFzczogXCJtZGMtZHJhd2VyX19zdWJ0aXRsZVwiLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgIFRleHRWaWV3KHRpdGxlIHx8ICcnKVxyXG4gICAgICAgIF1cclxuICAgIH0pXHJcbn0iXX0=