"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Div_1 = require("../../core/Div");
const Main_1 = require("../../core/Main");
exports.default = ({ drawer, appBar, body }) => {
    return Div_1.default({
        class: 'scaffold',
        children: [
            drawer,
            Div_1.default({
                class: "mdc-drawer-app-content",
                children: [
                    appBar,
                    Main_1.default({
                        class: "main-content",
                        id: "main-content",
                        children: [
                            Div_1.default({
                                class: "mdc-top-app-bar--fixed-adjust",
                                children: [body]
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NhZmZvbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWQvU2NhZmZvbGQvU2NhZmZvbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBZ0M7QUFDaEMsMENBQWtDO0FBR2xDLGtCQUFlLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBMkMsRUFBRSxFQUFFO0lBQ2pGLE9BQU8sYUFBRyxDQUFDO1FBQ1AsS0FBSyxFQUFFLFVBQVU7UUFDakIsUUFBUSxFQUFFO1lBQ04sTUFBTTtZQUNOLGFBQUcsQ0FBQztnQkFDQSxLQUFLLEVBQUUsd0JBQXdCO2dCQUMvQixRQUFRLEVBQUU7b0JBQ04sTUFBTTtvQkFDTixjQUFJLENBQUM7d0JBQ0QsS0FBSyxFQUFFLGNBQWM7d0JBQ3JCLEVBQUUsRUFBRSxjQUFjO3dCQUNsQixRQUFRLEVBQUU7NEJBQ04sYUFBRyxDQUFDO2dDQUNBLEtBQUssRUFBRSwrQkFBK0I7Z0NBQ3RDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQzs2QkFDbkIsQ0FBQzt5QkFDTDtxQkFDSixDQUFDO2lCQUVMO2FBQ0osQ0FBQztTQUNMO0tBQ0osQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERpdiBmcm9tIFwiLi4vLi4vY29yZS9EaXZcIlxyXG5pbXBvcnQgTWFpbiBmcm9tIFwiLi4vLi4vY29yZS9NYWluXCJcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCAoeyBkcmF3ZXIsIGFwcEJhciwgYm9keSB9OiB7IGRyYXdlcjogYW55LCBhcHBCYXI6IGFueSwgYm9keTogYW55IH0pID0+IHtcclxuICAgIHJldHVybiBEaXYoe1xyXG4gICAgICAgIGNsYXNzOiAnc2NhZmZvbGQnLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgIGRyYXdlcixcclxuICAgICAgICAgICAgRGl2KHtcclxuICAgICAgICAgICAgICAgIGNsYXNzOiBcIm1kYy1kcmF3ZXItYXBwLWNvbnRlbnRcIixcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwQmFyLFxyXG4gICAgICAgICAgICAgICAgICAgIE1haW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogXCJtYWluLWNvbnRlbnRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibWFpbi1jb250ZW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEaXYoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBcIm1kYy10b3AtYXBwLWJhci0tZml4ZWQtYWRqdXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtib2R5XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIF1cclxuICAgIH0pXHJcbn0iXX0=