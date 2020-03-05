"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AreaInput_1 = require("../core/AreaInput");
const style = {
    outline: 'none',
    border: '1px solid #ccc',
    borderRadius: '5px',
};
exports.default = (props = {}) => {
    props.style = Object.assign({}, style, props.style);
    return AreaInput_1.default(Object.assign({}, props));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dEFyZWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdWkvVGV4dEFyZWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBMEM7QUFFMUMsTUFBTSxLQUFLLEdBQUc7SUFDWixPQUFPLEVBQUUsTUFBTTtJQUNmLE1BQU0sRUFBRSxnQkFBZ0I7SUFDeEIsWUFBWSxFQUFFLEtBQUs7Q0FDcEIsQ0FBQztBQUVGLGtCQUFlLENBQUMsUUFBYSxFQUFFLEVBQUUsRUFBRTtJQUNqQyxLQUFLLENBQUMsS0FBSyxxQkFBUSxLQUFLLEVBQUssS0FBSyxDQUFDLEtBQUssQ0FBRSxDQUFDO0lBQzNDLE9BQU8sbUJBQVMsbUJBQ1gsS0FBSyxFQUNSLENBQUM7QUFDTCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXJlYUlucHV0IGZyb20gJy4uL2NvcmUvQXJlYUlucHV0JztcclxuXHJcbmNvbnN0IHN0eWxlID0ge1xyXG4gIG91dGxpbmU6ICdub25lJyxcclxuICBib3JkZXI6ICcxcHggc29saWQgI2NjYycsXHJcbiAgYm9yZGVyUmFkaXVzOiAnNXB4JyxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChwcm9wczogYW55ID0ge30pID0+IHtcclxuICBwcm9wcy5zdHlsZSA9IHsgLi4uc3R5bGUsIC4uLnByb3BzLnN0eWxlIH07XHJcbiAgcmV0dXJuIEFyZWFJbnB1dCh7XHJcbiAgICAuLi5wcm9wcyxcclxuICB9KTtcclxufTtcclxuIl19