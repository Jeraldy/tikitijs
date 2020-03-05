"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnorderedList_1 = require("../core/UnorderedList");
const style = {
    listStyleType: 'none',
    margin: '0',
    padding: '8px',
};
exports.default = (props = {}) => {
    props.style = Object.assign({}, style, props.style);
    return UnorderedList_1.default(Object.assign({}, props));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdFZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdWkvTGlzdFZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5REFBa0Q7QUFFbEQsTUFBTSxLQUFLLEdBQUc7SUFDWixhQUFhLEVBQUUsTUFBTTtJQUNyQixNQUFNLEVBQUUsR0FBRztJQUNYLE9BQU8sRUFBRSxLQUFLO0NBQ2YsQ0FBQztBQUVGLGtCQUFlLENBQUMsUUFBYSxFQUFFLEVBQUUsRUFBRTtJQUNqQyxLQUFLLENBQUMsS0FBSyxxQkFBUSxLQUFLLEVBQUssS0FBSyxDQUFDLEtBQUssQ0FBRSxDQUFDO0lBQzNDLE9BQU8sdUJBQWEsbUJBQ2YsS0FBSyxFQUNSLENBQUM7QUFDTCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVW5vcmRlcmVkTGlzdCBmcm9tICcuLi9jb3JlL1Vub3JkZXJlZExpc3QnO1xyXG5cclxuY29uc3Qgc3R5bGUgPSB7XHJcbiAgbGlzdFN0eWxlVHlwZTogJ25vbmUnLFxyXG4gIG1hcmdpbjogJzAnLFxyXG4gIHBhZGRpbmc6ICc4cHgnLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKHByb3BzOiBhbnkgPSB7fSkgPT4ge1xyXG4gIHByb3BzLnN0eWxlID0geyAuLi5zdHlsZSwgLi4ucHJvcHMuc3R5bGUgfTtcclxuICByZXR1cm4gVW5vcmRlcmVkTGlzdCh7XHJcbiAgICAuLi5wcm9wcyxcclxuICB9KTtcclxufTtcclxuIl19