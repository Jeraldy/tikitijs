"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("./Node");
exports.default = (props) => {
    props.ref = Math.random()
        .toString(36)
        .substring(7)
        .toString();
    return Node_1.default(props, 'textarea');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJlYUlucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvQXJlYUlucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQTBCO0FBRTFCLGtCQUFlLENBQUMsS0FBVSxFQUFFLEVBQUU7SUFDNUIsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFO1NBQ3RCLFFBQVEsQ0FBQyxFQUFFLENBQUM7U0FDWixTQUFTLENBQUMsQ0FBQyxDQUFDO1NBQ1osUUFBUSxFQUFFLENBQUM7SUFDZCxPQUFPLGNBQUksQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDakMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5vZGUgZnJvbSAnLi9Ob2RlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChwcm9wczogYW55KSA9PiB7XHJcbiAgcHJvcHMucmVmID0gTWF0aC5yYW5kb20oKVxyXG4gICAgLnRvU3RyaW5nKDM2KVxyXG4gICAgLnN1YnN0cmluZyg3KVxyXG4gICAgLnRvU3RyaW5nKCk7XHJcbiAgcmV0dXJuIE5vZGUocHJvcHMsICd0ZXh0YXJlYScpO1xyXG59O1xyXG4iXX0=