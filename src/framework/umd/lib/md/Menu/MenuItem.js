"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ListItem_1 = require("../../core/ListItem");
const TextView_1 = require("../../core/TextView");
exports.default = ({ label, onclick }) => {
    return ListItem_1.default({
        class: "mdc-list-item",
        role: "menuitem",
        children: [
            TextView_1.default(label || '')
        ],
        onclick: onclick || function () { }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVudUl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWQvTWVudS9NZW51SXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtEQUEwQztBQUMxQyxrREFBMkM7QUFHM0Msa0JBQWUsQ0FDWCxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQWtELEVBQ3BFLEVBQUU7SUFFQSxPQUFPLGtCQUFRLENBQUM7UUFDWixLQUFLLEVBQUUsZUFBZTtRQUN0QixJQUFJLEVBQUUsVUFBVTtRQUNoQixRQUFRLEVBQUU7WUFDTixrQkFBUSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7U0FDeEI7UUFDRCxPQUFPLEVBQUUsT0FBTyxJQUFJLGNBQVcsQ0FBQztLQUNuQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGlzdEl0ZW0gZnJvbSBcIi4uLy4uL2NvcmUvTGlzdEl0ZW1cIlxyXG5pbXBvcnQgVGV4dFZpZXcgZnJvbSBcIi4uLy4uL2NvcmUvVGV4dFZpZXdcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCAoXHJcbiAgICB7IGxhYmVsLCBvbmNsaWNrIH06IHsgbGFiZWw6IHN0cmluZywgb25jbGljazogKGU6IEV2ZW50KSA9PiB2b2lkIH0sXHJcbikgPT4ge1xyXG5cclxuICAgIHJldHVybiBMaXN0SXRlbSh7XHJcbiAgICAgICAgY2xhc3M6IFwibWRjLWxpc3QtaXRlbVwiLFxyXG4gICAgICAgIHJvbGU6IFwibWVudWl0ZW1cIixcclxuICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICBUZXh0VmlldyhsYWJlbCB8fCAnJylcclxuICAgICAgICBdLFxyXG4gICAgICAgIG9uY2xpY2s6IG9uY2xpY2sgfHwgZnVuY3Rpb24oKXt9XHJcbiAgICB9KVxyXG59Il19