"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ListItem_1 = require("../../core/ListItem");
const TextView_1 = require("../../core/TextView");
exports.default = ({ label, onclick }) => {
    return ListItem_1.default({
        class: "mdc-list-item",
        children: [
            TextView_1.default(label || '')
        ],
        onclick: onclick || function () { }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdEl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWQvTGlzdFZpZXcvTGlzdEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrREFBMEM7QUFDMUMsa0RBQTJDO0FBRTNDLGtCQUFlLENBQ1gsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUM4QixFQUNoRCxFQUFFO0lBRUEsT0FBTyxrQkFBUSxDQUFDO1FBQ1osS0FBSyxFQUFFLGVBQWU7UUFDdEIsUUFBUSxFQUFFO1lBQ04sa0JBQVEsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxFQUFFLE9BQU8sSUFBSSxjQUFjLENBQUM7S0FDdEMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExpc3RJdGVtIGZyb20gXCIuLi8uLi9jb3JlL0xpc3RJdGVtXCJcclxuaW1wb3J0IFRleHRWaWV3IGZyb20gXCIuLi8uLi9jb3JlL1RleHRWaWV3XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoXHJcbiAgICB7IGxhYmVsLCBvbmNsaWNrIH06XHJcbiAgICB7IGxhYmVsOiBzdHJpbmcsIG9uY2xpY2s6IChlOiBFdmVudCkgPT4gdm9pZCB9LFxyXG4pID0+IHtcclxuXHJcbiAgICByZXR1cm4gTGlzdEl0ZW0oe1xyXG4gICAgICAgIGNsYXNzOiBcIm1kYy1saXN0LWl0ZW1cIixcclxuICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICBUZXh0VmlldyhsYWJlbCB8fCAnJylcclxuICAgICAgICBdLFxyXG4gICAgICAgIG9uY2xpY2s6IG9uY2xpY2sgfHwgZnVuY3Rpb24gKCkgeyB9XHJcbiAgICB9KVxyXG59Il19