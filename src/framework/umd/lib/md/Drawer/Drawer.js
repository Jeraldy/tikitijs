"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Aside_1 = require("../../core/Aside");
const DrawerTypes_1 = require("./DrawerTypes");
const Div_1 = require("../../core/Div");
require("../style.scss");
exports.default = ({ type, action, header }) => {
    return Aside_1.default({
        id: 'aside-menu',
        class: type || DrawerTypes_1.default.PERMANENT,
        children: [
            header || null,
            Div_1.default({
                class: "mdc-drawer__content",
                children: [
                    action || null
                ]
            })
        ]
    });
};
function toggleDrawer() {
    document.getElementById("aside-menu")
        .classList.toggle('mdc-drawer--open');
}
exports.toggleDrawer = toggleDrawer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJhd2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21kL0RyYXdlci9EcmF3ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBb0M7QUFDcEMsK0NBQXNDO0FBQ3RDLHdDQUFpQztBQUNqQyx5QkFBdUI7QUFJdkIsa0JBQWUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUVyQyxFQUFFLEVBQUU7SUFDRCxPQUFPLGVBQUssQ0FBQztRQUNULEVBQUUsRUFBRSxZQUFZO1FBQ2hCLEtBQUssRUFBRSxJQUFJLElBQUkscUJBQVUsQ0FBQyxTQUFTO1FBQ25DLFFBQVEsRUFBRTtZQUNOLE1BQU0sSUFBSSxJQUFJO1lBQ2QsYUFBRyxDQUFDO2dCQUNBLEtBQUssRUFBRSxxQkFBcUI7Z0JBQzVCLFFBQVEsRUFBRTtvQkFDTixNQUFNLElBQUksSUFBSTtpQkFDakI7YUFDSixDQUFDO1NBQ0w7S0FDSixDQUFDLENBQUE7QUFDTixDQUFDLENBQUE7QUFFRCxTQUFnQixZQUFZO0lBQ3hCLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDO1NBQ2hDLFNBQVMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBSEQsb0NBR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXNpZGUgZnJvbSBcIi4uLy4uL2NvcmUvQXNpZGVcIlxyXG5pbXBvcnQgRHJhd2VyVHlwZSBmcm9tIFwiLi9EcmF3ZXJUeXBlc1wiXHJcbmltcG9ydCBEaXYgZnJvbSBcIi4uLy4uL2NvcmUvRGl2XCI7XHJcbmltcG9ydCAnLi4vc3R5bGUuc2Nzcyc7XHJcblxyXG50eXBlIGRyYXdlclR5cGUgPSBEcmF3ZXJUeXBlLkRJU01JU1NJQkxFIHwgRHJhd2VyVHlwZS5NT0RBTCB8IERyYXdlclR5cGUuUEVSTUFORU5UXHJcblxyXG5leHBvcnQgZGVmYXVsdCAoeyB0eXBlLCBhY3Rpb24sIGhlYWRlciB9OiB7XHJcbiAgICB0eXBlOiBkcmF3ZXJUeXBlLCBhY3Rpb246IGFueSwgaGVhZGVyOiBhbnlcclxufSkgPT4ge1xyXG4gICAgcmV0dXJuIEFzaWRlKHtcclxuICAgICAgICBpZDogJ2FzaWRlLW1lbnUnLFxyXG4gICAgICAgIGNsYXNzOiB0eXBlIHx8IERyYXdlclR5cGUuUEVSTUFORU5ULFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgIGhlYWRlciB8fCBudWxsLFxyXG4gICAgICAgICAgICBEaXYoe1xyXG4gICAgICAgICAgICAgICAgY2xhc3M6IFwibWRjLWRyYXdlcl9fY29udGVudFwiLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24gfHwgbnVsbFxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIF1cclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVEcmF3ZXIoKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFzaWRlLW1lbnVcIilcclxuICAgICAgICAuY2xhc3NMaXN0LnRvZ2dsZSgnbWRjLWRyYXdlci0tb3BlbicpO1xyXG59Il19