"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nav_1 = require("../../core/Nav");
exports.default = ({ items }) => {
    return Nav_1.default({
        class: 'mdc-list',
        children: [
            ...items || []
        ]
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tZC9EcmF3ZXIvQWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUFnQztBQUdoQyxrQkFBZSxDQUFDLEVBQUUsS0FBSyxFQUF5QixFQUFFLEVBQUU7SUFDaEQsT0FBTyxhQUFHLENBQUM7UUFDUCxLQUFLLEVBQUUsVUFBVTtRQUNqQixRQUFRLEVBQUU7WUFDTixHQUFHLEtBQUssSUFBSSxFQUFFO1NBQ2pCO0tBQ0osQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5hdiBmcm9tIFwiLi4vLi4vY29yZS9OYXZcIlxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0ICh7IGl0ZW1zIH06IHsgaXRlbXM6IEFycmF5PGFueT4gfSkgPT4ge1xyXG4gICAgcmV0dXJuIE5hdih7XHJcbiAgICAgICAgY2xhc3M6ICdtZGMtbGlzdCcsXHJcbiAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgLi4uaXRlbXMgfHwgW11cclxuICAgICAgICBdXHJcbiAgICB9KVxyXG59Il19