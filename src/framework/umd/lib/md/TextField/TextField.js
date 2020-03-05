"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Div_1 = require("../../core/Div");
const TextInput_1 = require("../../core/TextInput");
const Label_1 = require("../../core/Label");
const TextView_1 = require("../../core/TextView");
const TextFieldTypes_1 = require("./TextFieldTypes");
//@ts-ignore
const textfield_1 = require("@material/textfield");
const utils_1 = require("../../ui/utils");
const I_1 = require("../../core/I");
exports.default = (props) => {
    let tType = props.type ? props.type : TextFieldTypes_1.default.OUTLINED;
    delete props.type;
    return tType == TextFieldTypes_1.default.OUTLINED ? oTextField(props) : fTextField(props);
};
function oTextField(params) {
    //@ts-ignore
    let _a = Object.assign({}, params), { label, id, helperText, leadingIcon, trailingIcon } = _a, props = __rest(_a, ["label", "id", "helperText", "leadingIcon", "trailingIcon"]);
    id = id || utils_1.genId();
    let hasleadingIco = leadingIcon ? 'mdc-text-field--with-leading-icon' : '';
    let hastrailingIco = trailingIcon ? 'mdc-text-field--with-trailing-icon' : '';
    initTextField(id);
    return Div_1.default({
        children: [
            Div_1.default({
                class: `mdc-text-field mdc-text-field--outlined ${hastrailingIco} ${hasleadingIco} text-field-${id}`,
                children: [
                    leadingIcon ? LIcon(leadingIcon) : null,
                    TextInput_1.default(Object.assign({ class: "mdc-text-field__input", id, 'aria-controls': "my-helper-id" + id, 'aria-describedby': "my-helper-id" + id }, props)),
                    trailingIcon ? TIcon(trailingIcon) : null,
                    Div_1.default({
                        class: "mdc-notched-outline",
                        children: [
                            Div_1.default({ class: "mdc-notched-outline__leading" }),
                            Div_1.default({
                                class: "mdc-notched-outline__notch",
                                children: [
                                    Label_1.default({
                                        for: id,
                                        class: "mdc-floating-label",
                                        children: [
                                            TextView_1.default(label || '')
                                        ]
                                    })
                                ]
                            }),
                            Div_1.default({ class: "mdc-notched-outline__trailing" })
                        ]
                    })
                ]
            }),
            Div_1.default({
                class: "mdc-text-field-helper-line",
                children: [
                    Div_1.default({
                        class: "mdc-text-field-helper-text",
                        'aria-hidden': "true",
                        id: "my-helper-" + id,
                        children: [
                            TextView_1.default(helperText || '')
                        ]
                    })
                ]
            })
        ]
    });
}
function fTextField(params) {
    //@ts-ignore
    let _a = Object.assign({}, params), { label, id, helperText, leadingIcon, trailingIcon } = _a, props = __rest(_a, ["label", "id", "helperText", "leadingIcon", "trailingIcon"]);
    id = id || utils_1.genId();
    let hasleadingIco = leadingIcon ? 'mdc-text-field--with-leading-icon' : '';
    let hastrailingIco = trailingIcon ? 'mdc-text-field--with-trailing-icon' : '';
    initTextField(id);
    return Div_1.default({
        class: `mdc-text-field ${hastrailingIco} ${hasleadingIco} text-field-${id}`,
        children: [
            leadingIcon ? LIcon(leadingIcon) : null,
            TextInput_1.default(Object.assign({ class: "mdc-text-field__input", id }, props)),
            trailingIcon ? TIcon(trailingIcon) : null,
            Div_1.default({ class: "mdc-line-ripple" }),
            Label_1.default({
                for: id,
                class: "mdc-floating-label",
                children: [
                    TextView_1.default(label || '')
                ]
            })
        ]
    });
}
function LIcon(icon) {
    return I_1.default({
        class: "material-icons mdc-text-field__icon mdc-text-field__icon--leading",
        tabindex: "0",
        role: "button",
        children: [
            TextView_1.default(icon)
        ]
    });
}
function TIcon(icon) {
    return I_1.default({
        class: "material-icons mdc-text-field__icon mdc-text-field__icon--trailing",
        tabindex: "0",
        role: "button",
        children: [
            TextView_1.default(icon)
        ]
    });
}
function initTextField(id) {
    document.addEventListener("DOMContentLoaded", (_) => {
        new textfield_1.MDCTextField(document.querySelector(`.text-field-${id}`));
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dEZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21kL1RleHRGaWVsZC9UZXh0RmllbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBZ0M7QUFDaEMsb0RBQTRDO0FBQzVDLDRDQUFvQztBQUNwQyxrREFBMEM7QUFDMUMscURBQThDO0FBQzlDLFlBQVk7QUFDWixtREFBbUQ7QUFDbkQsMENBQXVDO0FBQ3ZDLG9DQUE2QjtBQUU3QixrQkFBZSxDQUFDLEtBQVUsRUFBRSxFQUFFO0lBQzFCLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLHdCQUFjLENBQUMsUUFBUSxDQUFBO0lBQzdELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQTtJQUNqQixPQUFPLEtBQUssSUFBSSx3QkFBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDbkYsQ0FBQyxDQUFBO0FBRUQsU0FBUyxVQUFVLENBQUMsTUFBVztJQUMzQixZQUFZO0lBQ1osSUFBSSw4QkFBOEUsRUFBOUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxPQUE0QixFQUExQixnRkFBMEIsQ0FBQTtJQUNsRixFQUFFLEdBQUcsRUFBRSxJQUFJLGFBQUssRUFBRSxDQUFBO0lBQ2xCLElBQUksYUFBYSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUMxRSxJQUFJLGNBQWMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLG9DQUFvQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7SUFDN0UsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ2pC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LENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztpQkFDeEI7YUFDSixDQUFDO1NBQ0w7S0FDSixDQUFDLENBQUE7QUFDTixDQUFDO0FBRUQsU0FBUyxLQUFLLENBQUMsSUFBWTtJQUN2QixPQUFPLFdBQUMsQ0FBQztRQUNMLEtBQUssRUFBRSxtRUFBbUU7UUFDMUUsUUFBUSxFQUFFLEdBQUc7UUFDYixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRTtZQUNOLGtCQUFRLENBQUMsSUFBSSxDQUFDO1NBQ2pCO0tBQ0osQ0FBQyxDQUFBO0FBQ04sQ0FBQztBQUVELFNBQVMsS0FBSyxDQUFDLElBQVk7SUFDdkIsT0FBTyxXQUFDLENBQUM7UUFDTCxLQUFLLEVBQUUsb0VBQW9FO1FBQzNFLFFBQVEsRUFBRSxHQUFHO1FBQ2IsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUU7WUFDTixrQkFBUSxDQUFDLElBQUksQ0FBQztTQUNqQjtLQUNKLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFFRCxTQUFTLGFBQWEsQ0FBQyxFQUFVO0lBQzdCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ2hELElBQUksd0JBQVksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEaXYgZnJvbSBcIi4uLy4uL2NvcmUvRGl2XCJcclxuaW1wb3J0IFRleHRJbnB1dCBmcm9tIFwiLi4vLi4vY29yZS9UZXh0SW5wdXRcIlxyXG5pbXBvcnQgTGFiZWwgZnJvbSBcIi4uLy4uL2NvcmUvTGFiZWxcIlxyXG5pbXBvcnQgVGV4dFZpZXcgZnJvbSBcIi4uLy4uL2NvcmUvVGV4dFZpZXdcIlxyXG5pbXBvcnQgdGV4dEZpZWxkVHlwZXMgZnJvbSAnLi9UZXh0RmllbGRUeXBlcyc7XHJcbi8vQHRzLWlnbm9yZVxyXG5pbXBvcnQgeyBNRENUZXh0RmllbGQgfSBmcm9tICdAbWF0ZXJpYWwvdGV4dGZpZWxkJztcclxuaW1wb3J0IHsgZ2VuSWQgfSBmcm9tIFwiLi4vLi4vdWkvdXRpbHNcIjtcclxuaW1wb3J0IEkgZnJvbSBcIi4uLy4uL2NvcmUvSVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKHByb3BzOiBhbnkpID0+IHtcclxuICAgIGxldCB0VHlwZSA9IHByb3BzLnR5cGUgPyBwcm9wcy50eXBlIDogdGV4dEZpZWxkVHlwZXMuT1VUTElORURcclxuICAgIGRlbGV0ZSBwcm9wcy50eXBlXHJcbiAgICByZXR1cm4gdFR5cGUgPT0gdGV4dEZpZWxkVHlwZXMuT1VUTElORUQgPyBvVGV4dEZpZWxkKHByb3BzKSA6IGZUZXh0RmllbGQocHJvcHMpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9UZXh0RmllbGQocGFyYW1zOiBhbnkpIHtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgbGV0IHsgbGFiZWwsIGlkLCBoZWxwZXJUZXh0LCBsZWFkaW5nSWNvbiwgdHJhaWxpbmdJY29uLCAuLi5wcm9wcyB9ID0geyAuLi5wYXJhbXMgfVxyXG4gICAgaWQgPSBpZCB8fCBnZW5JZCgpXHJcbiAgICBsZXQgaGFzbGVhZGluZ0ljbyA9IGxlYWRpbmdJY29uID8gJ21kYy10ZXh0LWZpZWxkLS13aXRoLWxlYWRpbmctaWNvbicgOiAnJ1xyXG4gICAgbGV0IGhhc3RyYWlsaW5nSWNvID0gdHJhaWxpbmdJY29uID8gJ21kYy10ZXh0LWZpZWxkLS13aXRoLXRyYWlsaW5nLWljb24nIDogJydcclxuICAgIGluaXRUZXh0RmllbGQoaWQpXHJcbiAgICByZXR1cm4gRGl2KHtcclxuICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICBEaXYoe1xyXG4gICAgICAgICAgICAgICAgY2xhc3M6IGBtZGMtdGV4dC1maWVsZCBtZGMtdGV4dC1maWVsZC0tb3V0bGluZWQgJHtoYXN0cmFpbGluZ0ljb30gJHtoYXNsZWFkaW5nSWNvfSB0ZXh0LWZpZWxkLSR7aWR9YCxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgbGVhZGluZ0ljb24gPyBMSWNvbihsZWFkaW5nSWNvbikgOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIFRleHRJbnB1dCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBcIm1kYy10ZXh0LWZpZWxkX19pbnB1dFwiLCBpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2FyaWEtY29udHJvbHMnOiBcIm15LWhlbHBlci1pZFwiICsgaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhcmlhLWRlc2NyaWJlZGJ5JzogXCJteS1oZWxwZXItaWRcIiArIGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5wcm9wc1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYWlsaW5nSWNvbiA/IFRJY29uKHRyYWlsaW5nSWNvbikgOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIERpdih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBcIm1kYy1ub3RjaGVkLW91dGxpbmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERpdih7IGNsYXNzOiBcIm1kYy1ub3RjaGVkLW91dGxpbmVfX2xlYWRpbmdcIiB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERpdih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IFwibWRjLW5vdGNoZWQtb3V0bGluZV9fbm90Y2hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYWJlbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3I6IGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IFwibWRjLWZsb2F0aW5nLWxhYmVsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRleHRWaWV3KGxhYmVsIHx8ICcnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGl2KHsgY2xhc3M6IFwibWRjLW5vdGNoZWQtb3V0bGluZV9fdHJhaWxpbmdcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIERpdih7XHJcbiAgICAgICAgICAgICAgICBjbGFzczogXCJtZGMtdGV4dC1maWVsZC1oZWxwZXItbGluZVwiLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICBEaXYoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogXCJtZGMtdGV4dC1maWVsZC1oZWxwZXItdGV4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiBcInRydWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibXktaGVscGVyLVwiICsgaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUZXh0VmlldyhoZWxwZXJUZXh0IHx8ICcnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICBdXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBmVGV4dEZpZWxkKHBhcmFtczogYW55KSB7XHJcbiAgICAvL0B0cy1pZ25vcmVcclxuICAgIGxldCB7IGxhYmVsLCBpZCwgaGVscGVyVGV4dCwgbGVhZGluZ0ljb24sIHRyYWlsaW5nSWNvbiwgLi4ucHJvcHMgfSA9IHsgLi4ucGFyYW1zIH1cclxuICAgIGlkID0gaWQgfHwgZ2VuSWQoKVxyXG4gICAgbGV0IGhhc2xlYWRpbmdJY28gPSBsZWFkaW5nSWNvbiA/ICdtZGMtdGV4dC1maWVsZC0td2l0aC1sZWFkaW5nLWljb24nIDogJydcclxuICAgIGxldCBoYXN0cmFpbGluZ0ljbyA9IHRyYWlsaW5nSWNvbiA/ICdtZGMtdGV4dC1maWVsZC0td2l0aC10cmFpbGluZy1pY29uJyA6ICcnXHJcbiAgICBpbml0VGV4dEZpZWxkKGlkKVxyXG4gICAgcmV0dXJuIERpdih7XHJcbiAgICAgICAgY2xhc3M6IGBtZGMtdGV4dC1maWVsZCAke2hhc3RyYWlsaW5nSWNvfSAke2hhc2xlYWRpbmdJY299IHRleHQtZmllbGQtJHtpZH1gLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgIGxlYWRpbmdJY29uID8gTEljb24obGVhZGluZ0ljb24pIDogbnVsbCxcclxuICAgICAgICAgICAgVGV4dElucHV0KHtcclxuICAgICAgICAgICAgICAgIGNsYXNzOiBcIm1kYy10ZXh0LWZpZWxkX19pbnB1dFwiLCBpZCxcclxuICAgICAgICAgICAgICAgIC4uLnByb3BzXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB0cmFpbGluZ0ljb24gPyBUSWNvbih0cmFpbGluZ0ljb24pIDogbnVsbCxcclxuICAgICAgICAgICAgRGl2KHsgY2xhc3M6IFwibWRjLWxpbmUtcmlwcGxlXCIgfSksXHJcbiAgICAgICAgICAgIExhYmVsKHtcclxuICAgICAgICAgICAgICAgIGZvcjogaWQsXHJcbiAgICAgICAgICAgICAgICBjbGFzczogXCJtZGMtZmxvYXRpbmctbGFiZWxcIixcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgVGV4dFZpZXcobGFiZWwgfHwgJycpXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gTEljb24oaWNvbjogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gSSh7XHJcbiAgICAgICAgY2xhc3M6IFwibWF0ZXJpYWwtaWNvbnMgbWRjLXRleHQtZmllbGRfX2ljb24gbWRjLXRleHQtZmllbGRfX2ljb24tLWxlYWRpbmdcIixcclxuICAgICAgICB0YWJpbmRleDogXCIwXCIsXHJcbiAgICAgICAgcm9sZTogXCJidXR0b25cIixcclxuICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICBUZXh0VmlldyhpY29uKVxyXG4gICAgICAgIF1cclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIFRJY29uKGljb246IHN0cmluZykge1xyXG4gICAgcmV0dXJuIEkoe1xyXG4gICAgICAgIGNsYXNzOiBcIm1hdGVyaWFsLWljb25zIG1kYy10ZXh0LWZpZWxkX19pY29uIG1kYy10ZXh0LWZpZWxkX19pY29uLS10cmFpbGluZ1wiLFxyXG4gICAgICAgIHRhYmluZGV4OiBcIjBcIixcclxuICAgICAgICByb2xlOiBcImJ1dHRvblwiLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgIFRleHRWaWV3KGljb24pXHJcbiAgICAgICAgXVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFRleHRGaWVsZChpZDogc3RyaW5nKSB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoXykgPT4ge1xyXG4gICAgICAgIG5ldyBNRENUZXh0RmllbGQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnRleHQtZmllbGQtJHtpZH1gKSk7XHJcbiAgICB9KTtcclxufSJdfQ==