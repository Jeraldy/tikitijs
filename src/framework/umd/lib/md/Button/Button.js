"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = require("../../core/Button");
const ButtonTypes_1 = require("./ButtonTypes");
const Div_1 = require("../../core/Div");
const Span_1 = require("../../core/Span");
const TextView_1 = require("../../core/TextView");
exports.default = ({ label, icon, type, onclick }) => {
    return Button_1.default({
        class: type || ButtonTypes_1.default.UNELEVETED,
        children: [
            Div_1.default({ class: 'mdc-button__ripple' }),
            Span_1.default({
                class: 'mdc-button__label',
                children: [
                    TextView_1.default(label || '')
                ]
            })
        ],
        onclick: onclick || function () { }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21kL0J1dHRvbi9CdXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBc0M7QUFDdEMsK0NBQXVDO0FBQ3ZDLHdDQUFnQztBQUNoQywwQ0FBa0M7QUFDbEMsa0RBQTBDO0FBSzFDLGtCQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBSXZDLEVBQUUsRUFBRTtJQUNMLE9BQU8sZ0JBQU0sQ0FBQztRQUNWLEtBQUssRUFBRSxJQUFJLElBQUkscUJBQVcsQ0FBQyxVQUFVO1FBQ3JDLFFBQVEsRUFBRTtZQUNOLGFBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRSxDQUFDO1lBQ3BDLGNBQUksQ0FBQztnQkFDRCxLQUFLLEVBQUUsbUJBQW1CO2dCQUMxQixRQUFRLEVBQUU7b0JBQ04sa0JBQVEsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO2lCQUN4QjthQUNKLENBQUM7U0FDTDtRQUNELE9BQU8sRUFBRSxPQUFPLElBQUksY0FBYyxDQUFDO0tBQ3RDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCdXR0b24gZnJvbSBcIi4uLy4uL2NvcmUvQnV0dG9uXCJcclxuaW1wb3J0IEJ1dHRvblR5cGVzIGZyb20gXCIuL0J1dHRvblR5cGVzXCJcclxuaW1wb3J0IERpdiBmcm9tIFwiLi4vLi4vY29yZS9EaXZcIlxyXG5pbXBvcnQgU3BhbiBmcm9tIFwiLi4vLi4vY29yZS9TcGFuXCJcclxuaW1wb3J0IFRleHRWaWV3IGZyb20gXCIuLi8uLi9jb3JlL1RleHRWaWV3XCJcclxuXHJcbnR5cGUgYnV0dG9uVHlwZSA9IEJ1dHRvblR5cGVzLkZMQVQgfCBCdXR0b25UeXBlcy5PVVRMSU5FRFxyXG4gICAgfCBCdXR0b25UeXBlcy5SQUlTRUQgfCBCdXR0b25UeXBlcy5VTkVMRVZFVEVEXHJcblxyXG5leHBvcnQgZGVmYXVsdCAoeyBsYWJlbCwgaWNvbiwgdHlwZSwgb25jbGljayB9OlxyXG4gICAge1xyXG4gICAgICAgIGxhYmVsOiBzdHJpbmcsIGljb246IHN0cmluZyxcclxuICAgICAgICB0eXBlOiBidXR0b25UeXBlLCBvbmNsaWNrOiAoZTogRXZlbnQpID0+IHZvaWRcclxuICAgIH0pID0+IHtcclxuICAgIHJldHVybiBCdXR0b24oe1xyXG4gICAgICAgIGNsYXNzOiB0eXBlIHx8IEJ1dHRvblR5cGVzLlVORUxFVkVURUQsXHJcbiAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgRGl2KHsgY2xhc3M6ICdtZGMtYnV0dG9uX19yaXBwbGUnIH0pLFxyXG4gICAgICAgICAgICBTcGFuKHtcclxuICAgICAgICAgICAgICAgIGNsYXNzOiAnbWRjLWJ1dHRvbl9fbGFiZWwnLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICBUZXh0VmlldyhsYWJlbCB8fCAnJylcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICBdLFxyXG4gICAgICAgIG9uY2xpY2s6IG9uY2xpY2sgfHwgZnVuY3Rpb24gKCkgeyB9XHJcbiAgICB9KVxyXG59Il19