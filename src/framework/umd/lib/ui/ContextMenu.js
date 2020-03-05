"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nav_1 = require("../core/Nav");
const Div_1 = require("../core/Div");
const TextView_1 = require("../core/TextView");
const Link_1 = require("../core/Link");
exports.default = (props) => {
    return Nav_1.default({
        class: 'dropdown',
        children: [
            ...(props.children || []),
            Div_1.default({
                class: 'dropdown-content',
                id: 'myDropdown',
                children: [
                    Link_1.default({
                        href: '#',
                        children: [TextView_1.default('Hello')],
                    }),
                ],
            }),
        ],
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGV4dE1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdWkvQ29udGV4dE1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBOEI7QUFDOUIscUNBQThCO0FBQzlCLCtDQUF3QztBQUN4Qyx1Q0FBZ0M7QUFFaEMsa0JBQWUsQ0FBQyxLQUFVLEVBQUUsRUFBRTtJQUM1QixPQUFPLGFBQUcsQ0FBQztRQUNULEtBQUssRUFBRSxVQUFVO1FBQ2pCLFFBQVEsRUFBRTtZQUNSLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztZQUN6QixhQUFHLENBQUM7Z0JBQ0YsS0FBSyxFQUFFLGtCQUFrQjtnQkFDekIsRUFBRSxFQUFFLFlBQVk7Z0JBQ2hCLFFBQVEsRUFBRTtvQkFDUixjQUFJLENBQUM7d0JBQ0gsSUFBSSxFQUFFLEdBQUc7d0JBQ1QsUUFBUSxFQUFFLENBQUMsa0JBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDOUIsQ0FBQztpQkFDSDthQUNGLENBQUM7U0FDSDtLQUNGLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOYXYgZnJvbSAnLi4vY29yZS9OYXYnO1xyXG5pbXBvcnQgRGl2IGZyb20gJy4uL2NvcmUvRGl2JztcclxuaW1wb3J0IFRleHRWaWV3IGZyb20gJy4uL2NvcmUvVGV4dFZpZXcnO1xyXG5pbXBvcnQgTGluayBmcm9tICcuLi9jb3JlL0xpbmsnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKHByb3BzOiBhbnkpID0+IHtcclxuICByZXR1cm4gTmF2KHtcclxuICAgIGNsYXNzOiAnZHJvcGRvd24nLFxyXG4gICAgY2hpbGRyZW46IFtcclxuICAgICAgLi4uKHByb3BzLmNoaWxkcmVuIHx8IFtdKSxcclxuICAgICAgRGl2KHtcclxuICAgICAgICBjbGFzczogJ2Ryb3Bkb3duLWNvbnRlbnQnLFxyXG4gICAgICAgIGlkOiAnbXlEcm9wZG93bicsXHJcbiAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgIExpbmsoe1xyXG4gICAgICAgICAgICBocmVmOiAnIycsXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbVGV4dFZpZXcoJ0hlbGxvJyldLFxyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgXSxcclxuICAgICAgfSksXHJcbiAgICBdLFxyXG4gIH0pO1xyXG59O1xyXG4iXX0=