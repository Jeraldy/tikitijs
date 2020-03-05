"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const reconcile_1 = require("../reconcile");
class StatefulWidget {
    constructor(props) {
        this.props = props;
        this.componentMounted();
    }
    mapStoreToState(reduxState) {
        return {};
    }
    componentDidMount() { }
    componentDidUpdate() { }
    componetWillUpdate() { }
    render() {
        throw new Error('Method not implemented.');
    }
    setState(NewState, render) {
        return __awaiter(this, void 0, void 0, function* () {
            this.componetWillUpdate();
            this.state = Object.assign({}, this.state, NewState);
            yield reconcile_1.default(this.node, this.render());
            this.componentDidUpdate();
            return this.state;
        });
    }
    componentMounted() {
        document.addEventListener('DOMContentLoaded', _ => this.componentDidMount());
    }
    connect() {
        this.node = this.render();
        return this.node;
    }
}
StatefulWidget.Init = class {
    constructor(entryNode) {
        document.body.appendChild(entryNode);
    }
};
exports.StatefulWidget = StatefulWidget;
exports.Tikiti = {
    Init(entryNode) {
        document.body.appendChild(entryNode);
    },
};
//"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGlraXRpL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw0Q0FBcUM7QUFVckMsTUFBYSxjQUFjO0lBZXpCLFlBQVksS0FBVztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBakJELGVBQWUsQ0FBQyxVQUFlO1FBQzdCLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUNELGlCQUFpQixLQUFVLENBQUM7SUFDNUIsa0JBQWtCLEtBQVUsQ0FBQztJQUM3QixrQkFBa0IsS0FBVSxDQUFDO0lBQzdCLE1BQU07UUFDSixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDN0MsQ0FBQztJQVdLLFFBQVEsQ0FBQyxRQUFZLEVBQUUsTUFBWTs7WUFDdkMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLEtBQUsscUJBQVEsSUFBSSxDQUFDLEtBQUssRUFBSyxRQUFRLENBQUUsQ0FBQztZQUM1QyxNQUFNLG1CQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFxQixDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDMUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BCLENBQUM7S0FBQTtJQUVPLGdCQUFnQjtRQUN0QixRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDMUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7O0FBRU0sbUJBQUksR0FBRztJQUNaLFlBQVksU0FBYztRQUN4QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2QyxDQUFDO0NBQ0YsQ0FBQztBQXpDSix3Q0EwQ0M7QUFFWSxRQUFBLE1BQU0sR0FBRztJQUNwQixJQUFJLENBQUMsU0FBYztRQUNqQixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2QyxDQUFDO0NBQ0YsQ0FBQztBQUVGLGlJQUFpSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZWNvbmNpbGUgZnJvbSAnLi4vcmVjb25jaWxlJztcclxuXHJcbmludGVyZmFjZSBMaWZlQ3ljbGVNZXRob2RzIHtcclxuICBjb21wb25lbnREaWRNb3VudCgpOiB2b2lkO1xyXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpOiB2b2lkO1xyXG4gIGNvbXBvbmV0V2lsbFVwZGF0ZSgpOiB2b2lkO1xyXG4gIG1hcFN0b3JlVG9TdGF0ZShyZWR1eFN0YXRlOiBhbnkpOiB7fTtcclxuICByZW5kZXIoKTogYW55O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhdGVmdWxXaWRnZXQgaW1wbGVtZW50cyBMaWZlQ3ljbGVNZXRob2RzIHtcclxuICBtYXBTdG9yZVRvU3RhdGUocmVkdXhTdGF0ZTogYW55KToge30ge1xyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH1cclxuICBjb21wb25lbnREaWRNb3VudCgpOiB2b2lkIHt9XHJcbiAgY29tcG9uZW50RGlkVXBkYXRlKCk6IHZvaWQge31cclxuICBjb21wb25ldFdpbGxVcGRhdGUoKTogdm9pZCB7fVxyXG4gIHJlbmRlcigpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbm9kZTogYW55O1xyXG4gIHJlYWRvbmx5IHByb3BzOiBhbnlbXTtcclxuICBzdGF0ZTogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm9wcz86IGFueSkge1xyXG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xyXG4gICAgdGhpcy5jb21wb25lbnRNb3VudGVkKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBzZXRTdGF0ZShOZXdTdGF0ZToge30sIHJlbmRlcj86IGFueSkge1xyXG4gICAgdGhpcy5jb21wb25ldFdpbGxVcGRhdGUoKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7IC4uLnRoaXMuc3RhdGUsIC4uLk5ld1N0YXRlIH07XHJcbiAgICBhd2FpdCByZWNvbmNpbGUodGhpcy5ub2RlLCB0aGlzLnJlbmRlcigpIGFzIHVua25vd24gYXMgTm9kZSk7XHJcbiAgICB0aGlzLmNvbXBvbmVudERpZFVwZGF0ZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXBvbmVudE1vdW50ZWQoKSB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgXyA9PiB0aGlzLmNvbXBvbmVudERpZE1vdW50KCkpO1xyXG4gIH1cclxuXHJcbiAgY29ubmVjdCgpIHtcclxuICAgIHRoaXMubm9kZSA9IHRoaXMucmVuZGVyKCk7XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIEluaXQgPSBjbGFzcyB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbnRyeU5vZGU6IGFueSkge1xyXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVudHJ5Tm9kZSk7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFRpa2l0aSA9IHtcclxuICBJbml0KGVudHJ5Tm9kZTogYW55KSB7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVudHJ5Tm9kZSk7XHJcbiAgfSxcclxufTtcclxuXHJcbi8vXCJDOlxcUHJvZ3JhbSBGaWxlcyAoeDg2KVxcR29vZ2xlXFxDaHJvbWVcXEFwcGxpY2F0aW9uXFxjaHJvbWUuZXhlXCIgLS1kaXNhYmxlLXdlYi1zZWN1cml0eSAtLWRpc2FibGUtZ3B1IC0tdXNlci1kYXRhLWRpcj1+L2Nocm9tZVRlbXBcclxuIl19