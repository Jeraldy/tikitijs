"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TextView_1 = require("../../core/TextView");
const Link_1 = require("../../core/Link");
const I_1 = require("../../core/I");
const Span_1 = require("../../core/Span");
const Hr_1 = require("../../core/Hr");
exports.default = ({ icon, label, onclick }) => {
    return Link_1.default({
        class: "mdc-list-item",
        href: '#',
        children: [
            icon ? I_1.default({
                class: "material-icons mdc-list-item__graphic",
                'aria-hidden': "true",
                children: [
                    TextView_1.default(icon)
                ]
            }) : null,
            Span_1.default({
                class: 'mdc-list-item__text',
                children: [
                    TextView_1.default(label || '')
                ]
            })
        ],
        onclick: onclick || function () { }
    });
};
function DrawerActionDivider() {
    return Hr_1.default({ class: "mdc-list-divider" });
}
exports.DrawerActionDivider = DrawerActionDivider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0aW9uSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tZC9EcmF3ZXIvQWN0aW9uSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtEQUEwQztBQUMxQywwQ0FBa0M7QUFDbEMsb0NBQTRCO0FBQzVCLDBDQUFrQztBQUNsQyxzQ0FBOEI7QUFFOUIsa0JBQWUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUMwQixFQUFFLEVBQUU7SUFDaEUsT0FBTyxjQUFJLENBQUM7UUFDUixLQUFLLEVBQUUsZUFBZTtRQUN0QixJQUFJLEVBQUUsR0FBRztRQUNULFFBQVEsRUFBRTtZQUNOLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBQyxDQUFDO2dCQUNMLEtBQUssRUFBRSx1Q0FBdUM7Z0JBQzlDLGFBQWEsRUFBRSxNQUFNO2dCQUNyQixRQUFRLEVBQUU7b0JBQ04sa0JBQVEsQ0FBQyxJQUFJLENBQUM7aUJBQ2pCO2FBQ0osQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ1QsY0FBSSxDQUFDO2dCQUNELEtBQUssRUFBRSxxQkFBcUI7Z0JBQzVCLFFBQVEsRUFBRTtvQkFDTixrQkFBUSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7aUJBQ3hCO2FBQ0osQ0FBQztTQUNMO1FBQ0QsT0FBTyxFQUFFLE9BQU8sSUFBSSxjQUFjLENBQUM7S0FDdEMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBO0FBRUQsU0FBZ0IsbUJBQW1CO0lBQy9CLE9BQU8sWUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQTtBQUM1QyxDQUFDO0FBRkQsa0RBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGV4dFZpZXcgZnJvbSBcIi4uLy4uL2NvcmUvVGV4dFZpZXdcIlxyXG5pbXBvcnQgTGluayBmcm9tIFwiLi4vLi4vY29yZS9MaW5rXCJcclxuaW1wb3J0IEkgZnJvbSBcIi4uLy4uL2NvcmUvSVwiXHJcbmltcG9ydCBTcGFuIGZyb20gXCIuLi8uLi9jb3JlL1NwYW5cIlxyXG5pbXBvcnQgSHIgZnJvbSBcIi4uLy4uL2NvcmUvSHJcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgKHsgaWNvbiwgbGFiZWwsIG9uY2xpY2sgfTpcclxuICAgIHsgaWNvbjogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCBvbmNsaWNrOiAoZTogRXZlbnQpID0+IHZvaWQgfSkgPT4ge1xyXG4gICAgcmV0dXJuIExpbmsoe1xyXG4gICAgICAgIGNsYXNzOiBcIm1kYy1saXN0LWl0ZW1cIixcclxuICAgICAgICBocmVmOiAnIycsXHJcbiAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgaWNvbiA/IEkoe1xyXG4gICAgICAgICAgICAgICAgY2xhc3M6IFwibWF0ZXJpYWwtaWNvbnMgbWRjLWxpc3QtaXRlbV9fZ3JhcGhpY1wiLFxyXG4gICAgICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogXCJ0cnVlXCIsXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgIFRleHRWaWV3KGljb24pXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0pIDogbnVsbCxcclxuICAgICAgICAgICAgU3Bhbih7XHJcbiAgICAgICAgICAgICAgICBjbGFzczogJ21kYy1saXN0LWl0ZW1fX3RleHQnLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICBUZXh0VmlldyhsYWJlbCB8fCAnJylcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICBdLFxyXG4gICAgICAgIG9uY2xpY2s6IG9uY2xpY2sgfHwgZnVuY3Rpb24gKCkgeyB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRHJhd2VyQWN0aW9uRGl2aWRlcigpIHtcclxuICAgIHJldHVybiBIcih7IGNsYXNzOiBcIm1kYy1saXN0LWRpdmlkZXJcIiB9KVxyXG59XHJcblxyXG4iXX0=