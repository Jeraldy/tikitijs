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
const utils_1 = require("../../ui/utils");
const Div_1 = require("../../core/Div");
const TextView_1 = require("../../core/TextView");
const Label_1 = require("../../core/Label");
//@ts-ignore
const textfield_1 = require("@material/textfield");
const AreaInput_1 = require("../../core/AreaInput");
exports.default = (params) => {
    //@ts-ignore
    let _a = Object.assign({}, params), { label, id } = _a, props = __rest(_a, ["label", "id"]);
    id = id || utils_1.genId();
    initTextField(id);
    return Div_1.default({
        class: `mdc-text-field mdc-text-field--textarea text-field-${id}`,
        children: [
            AreaInput_1.default(Object.assign({ class: "mdc-text-field__input", id }, props)),
            Div_1.default({
                class: "mdc-notched-outline",
                children: [
                    Div_1.default({ class: "mdc-notched-outline__leading" }),
                    Div_1.default({
                        class: "mdc-notched-outline__notch",
                        children: [
                            Label_1.default({
                                for: id,
                                class: "mdc-floating-label",
                                children: [
                                    TextView_1.default(label || '')
                                ]
                            })
                        ]
                    }),
                    Div_1.default({ class: "mdc-notched-outline__trailing" })
                ]
            })
        ]
    });
};
function initTextField(id) {
    document.addEventListener("DOMContentLoaded", (_) => {
        new textfield_1.MDCTextField(document.querySelector(`.text-field-${id}`));
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dEFyZWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWQvVGV4dEZpZWxkL1RleHRBcmVhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMENBQXNDO0FBQ3RDLHdDQUFnQztBQUNoQyxrREFBMEM7QUFDMUMsNENBQW9DO0FBQ3BDLFlBQVk7QUFDWixtREFBbUQ7QUFDbkQsb0RBQTZDO0FBRTdDLGtCQUFlLENBQUMsTUFBVyxFQUFFLEVBQUU7SUFDM0IsWUFBWTtJQUNaLElBQUksOEJBQXVDLEVBQXZDLEVBQUUsS0FBSyxFQUFFLEVBQUUsT0FBNEIsRUFBMUIsbUNBQTBCLENBQUE7SUFDM0MsRUFBRSxHQUFHLEVBQUUsSUFBSSxhQUFLLEVBQUUsQ0FBQTtJQUNsQixhQUFhLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDakIsT0FBTyxhQUFHLENBQUM7UUFDUCxLQUFLLEVBQUUsc0RBQXNELEVBQUUsRUFBRTtRQUNqRSxRQUFRLEVBQUU7WUFDTixtQkFBUyxpQkFDTCxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsRUFBRSxJQUMvQixLQUFLLEVBQ1Y7WUFDRixhQUFHLENBQUM7Z0JBQ0EsS0FBSyxFQUFFLHFCQUFxQjtnQkFDNUIsUUFBUSxFQUFFO29CQUNOLGFBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSw4QkFBOEIsRUFBRSxDQUFDO29CQUM5QyxhQUFHLENBQUM7d0JBQ0EsS0FBSyxFQUFFLDRCQUE0Qjt3QkFDbkMsUUFBUSxFQUFFOzRCQUNOLGVBQUssQ0FBQztnQ0FDRixHQUFHLEVBQUUsRUFBRTtnQ0FDUCxLQUFLLEVBQUUsb0JBQW9CO2dDQUMzQixRQUFRLEVBQUU7b0NBQ04sa0JBQVEsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO2lDQUN4Qjs2QkFDSixDQUFDO3lCQUNMO3FCQUNKLENBQUM7b0JBQ0YsYUFBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLCtCQUErQixFQUFFLENBQUM7aUJBQ2xEO2FBQ0osQ0FBQztTQUNMO0tBQ0osQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBO0FBRUQsU0FBUyxhQUFhLENBQUMsRUFBVTtJQUM3QixRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNoRCxJQUFJLHdCQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZW5JZCB9IGZyb20gXCIuLi8uLi91aS91dGlsc1wiXHJcbmltcG9ydCBEaXYgZnJvbSBcIi4uLy4uL2NvcmUvRGl2XCJcclxuaW1wb3J0IFRleHRWaWV3IGZyb20gXCIuLi8uLi9jb3JlL1RleHRWaWV3XCJcclxuaW1wb3J0IExhYmVsIGZyb20gXCIuLi8uLi9jb3JlL0xhYmVsXCJcclxuLy9AdHMtaWdub3JlXHJcbmltcG9ydCB7IE1EQ1RleHRGaWVsZCB9IGZyb20gJ0BtYXRlcmlhbC90ZXh0ZmllbGQnO1xyXG5pbXBvcnQgQXJlYUlucHV0IGZyb20gXCIuLi8uLi9jb3JlL0FyZWFJbnB1dFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKHBhcmFtczogYW55KSA9PiB7XHJcbiAgICAvL0B0cy1pZ25vcmVcclxuICAgIGxldCB7IGxhYmVsLCBpZCwgLi4ucHJvcHMgfSA9IHsgLi4ucGFyYW1zIH1cclxuICAgIGlkID0gaWQgfHwgZ2VuSWQoKVxyXG4gICAgaW5pdFRleHRGaWVsZChpZClcclxuICAgIHJldHVybiBEaXYoe1xyXG4gICAgICAgIGNsYXNzOiBgbWRjLXRleHQtZmllbGQgbWRjLXRleHQtZmllbGQtLXRleHRhcmVhIHRleHQtZmllbGQtJHtpZH1gLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgIEFyZWFJbnB1dCh7XHJcbiAgICAgICAgICAgICAgICBjbGFzczogXCJtZGMtdGV4dC1maWVsZF9faW5wdXRcIiwgaWQsXHJcbiAgICAgICAgICAgICAgICAuLi5wcm9wc1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgRGl2KHtcclxuICAgICAgICAgICAgICAgIGNsYXNzOiBcIm1kYy1ub3RjaGVkLW91dGxpbmVcIixcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgRGl2KHsgY2xhc3M6IFwibWRjLW5vdGNoZWQtb3V0bGluZV9fbGVhZGluZ1wiIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIERpdih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBcIm1kYy1ub3RjaGVkLW91dGxpbmVfX25vdGNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYWJlbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yOiBpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogXCJtZGMtZmxvYXRpbmctbGFiZWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUZXh0VmlldyhsYWJlbCB8fCAnJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgRGl2KHsgY2xhc3M6IFwibWRjLW5vdGNoZWQtb3V0bGluZV9fdHJhaWxpbmdcIiB9KVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIF1cclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRUZXh0RmllbGQoaWQ6IHN0cmluZykge1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKF8pID0+IHtcclxuICAgICAgICBuZXcgTURDVGV4dEZpZWxkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC50ZXh0LWZpZWxkLSR7aWR9YCkpO1xyXG4gICAgfSk7XHJcbn0iXX0=