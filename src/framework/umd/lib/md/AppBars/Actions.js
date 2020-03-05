"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Section_1 = require("../../core/Section");
const ActionAlignment_1 = require("./ActionAlignment");
exports.default = ({ items, align }) => {
    return Section_1.default({
        class: align || ActionAlignment_1.default.END,
        children: [
            ...items || []
        ]
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tZC9BcHBCYXJzL0FjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnREFBd0M7QUFDeEMsdURBQXlDO0FBRXpDLGtCQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFpRSxFQUFFLEVBQUU7SUFDL0YsT0FBTyxpQkFBTyxDQUFDO1FBQ1gsS0FBSyxFQUFFLEtBQUssSUFBSSx5QkFBUyxDQUFDLEdBQUc7UUFDN0IsUUFBUSxFQUFFO1lBQ04sR0FBRyxLQUFLLElBQUksRUFBRTtTQUNqQjtLQUNKLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTZWN0aW9uIGZyb20gXCIuLi8uLi9jb3JlL1NlY3Rpb25cIlxyXG5pbXBvcnQgQWxpZ25tZW50IGZyb20gXCIuL0FjdGlvbkFsaWdubWVudFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCAoeyBpdGVtcywgYWxpZ24gfTogeyBpdGVtczogQXJyYXk8YW55PiwgYWxpZ246IEFsaWdubWVudC5TVEFSVCB8IEFsaWdubWVudC5FTkQgfSkgPT4ge1xyXG4gICAgcmV0dXJuIFNlY3Rpb24oe1xyXG4gICAgICAgIGNsYXNzOiBhbGlnbiB8fCBBbGlnbm1lbnQuRU5ELFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgIC4uLml0ZW1zIHx8IFtdXHJcbiAgICAgICAgXVxyXG4gICAgfSlcclxufSJdfQ==