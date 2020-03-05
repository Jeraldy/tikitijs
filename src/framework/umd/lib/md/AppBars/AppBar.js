"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Header_1 = require("../../core/Header");
const Div_1 = require("../../core/Div");
const AppBarType_1 = require("./AppBarType");
require("../style.scss");
exports.default = ({ barType, children }) => {
    return Header_1.default({
        class: barType || AppBarType_1.default.STANDARD,
        children: [
            Div_1.default({
                class: cls,
                children: [
                    ...children || [],
                ]
            })
        ],
        style: {
            backgroundColor: '#ff6600'
        }
    });
};
const cls = "mdc-top-app-bar__row";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwQmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21kL0FwcEJhcnMvQXBwQmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQXNDO0FBQ3RDLHdDQUFnQztBQUNoQyw2Q0FBa0M7QUFDbEMseUJBQXVCO0FBTXZCLGtCQUFlLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUErQyxFQUFFLEVBQUU7SUFDbEYsT0FBTyxnQkFBTSxDQUFDO1FBQ1YsS0FBSyxFQUFFLE9BQU8sSUFBSSxvQkFBTyxDQUFDLFFBQVE7UUFDbEMsUUFBUSxFQUFFO1lBQ04sYUFBRyxDQUFDO2dCQUNBLEtBQUssRUFBRSxHQUFHO2dCQUNWLFFBQVEsRUFBRTtvQkFDTixHQUFHLFFBQVEsSUFBSSxFQUFFO2lCQUNwQjthQUNKLENBQUM7U0FDTDtRQUNELEtBQUssRUFBRTtZQUNILGVBQWUsRUFBRSxTQUFTO1NBQzdCO0tBQ0osQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBO0FBRUQsTUFBTSxHQUFHLEdBQUcsc0JBQXNCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSGVhZGVyIGZyb20gXCIuLi8uLi9jb3JlL0hlYWRlclwiXHJcbmltcG9ydCBEaXYgZnJvbSBcIi4uLy4uL2NvcmUvRGl2XCJcclxuaW1wb3J0IEJhclR5cGUgZnJvbSBcIi4vQXBwQmFyVHlwZVwiXHJcbmltcG9ydCAnLi4vc3R5bGUuc2Nzcyc7XHJcblxyXG50eXBlIF9CYXJUeXBlID0gQmFyVHlwZS5ERU5TRSB8IEJhclR5cGUuRklYRUQgfCBCYXJUeXBlLlBST01JTkVOVFxyXG4gICAgfCBCYXJUeXBlLlBST01JTkVOVF9ERU5TRSB8IEJhclR5cGUuU0hPUlQgfCBCYXJUeXBlLlNIT1JUX0NPTExBUFNFRFxyXG4gICAgfCBCYXJUeXBlLlNUQU5EQVJEO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKHsgYmFyVHlwZSwgY2hpbGRyZW4gfTogeyBiYXJUeXBlOiBfQmFyVHlwZSwgY2hpbGRyZW46IEFycmF5PGFueT4gfSkgPT4ge1xyXG4gICAgcmV0dXJuIEhlYWRlcih7XHJcbiAgICAgICAgY2xhc3M6IGJhclR5cGUgfHwgQmFyVHlwZS5TVEFOREFSRCxcclxuICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICBEaXYoe1xyXG4gICAgICAgICAgICAgICAgY2xhc3M6IGNscyxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgLi4uY2hpbGRyZW4gfHwgW10sXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXSxcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmY2NjAwJ1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmNvbnN0IGNscyA9IFwibWRjLXRvcC1hcHAtYmFyX19yb3dcIiJdfQ==