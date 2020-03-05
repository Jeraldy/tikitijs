"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TextView_1 = require("../core/TextView");
const FileInput_1 = require("../core/FileInput");
const Label_1 = require("../core/Label");
const Span_1 = require("../core/Span");
const style = {
    width: '0.1px',
    height: '0.1px',
    opacity: '0',
    overflow: 'hidden',
    position: 'absolute',
    zIndex: ' -1',
    backgroundColor: '#E6E6E6',
};
const labelStyle = {
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#E6E6E6',
    width: '100px',
    minHeight: '30px',
    cursor: 'pointer',
    padding: '5px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
};
exports.default = (props = {}) => {
    props.style = Object.assign({}, style, props.style);
    props.children = [TextView_1.default(props.label || '')];
    delete props.label;
    const ref = props.id || Math.random();
    init(ref);
    return Span_1.default({
        children: [
            FileInput_1.default(Object.assign({}, props, { id: ref })),
            Label_1.default({
                style: labelStyle,
                for: ref,
                children: [TextView_1.default('Choose File')],
            }),
        ],
    });
};
function init(id) {
    document.addEventListener('DOMContentLoaded', (_) => {
        const input = document.getElementById(id);
        input.addEventListener('change', (e) => {
            // @ts-ignore
            input.nextElementSibling.textContent = e.target.files[0].name || 'Choose File';
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZUZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3VpL0ZpbGVGaWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUF3QztBQUN4QyxpREFBMEM7QUFDMUMseUNBQWtDO0FBQ2xDLHVDQUFnQztBQUVoQyxNQUFNLEtBQUssR0FBRztJQUNaLEtBQUssRUFBRSxPQUFPO0lBQ2QsTUFBTSxFQUFFLE9BQU87SUFDZixPQUFPLEVBQUUsR0FBRztJQUNaLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLFFBQVEsRUFBRSxVQUFVO0lBQ3BCLE1BQU0sRUFBRSxLQUFLO0lBQ2IsZUFBZSxFQUFFLFNBQVM7Q0FDM0IsQ0FBQztBQUVGLE1BQU0sVUFBVSxHQUFHO0lBQ2pCLFlBQVksRUFBRSxLQUFLO0lBQ25CLE1BQU0sRUFBRSxnQkFBZ0I7SUFDeEIsZUFBZSxFQUFFLFNBQVM7SUFDMUIsS0FBSyxFQUFFLE9BQU87SUFDZCxTQUFTLEVBQUUsTUFBTTtJQUNqQixNQUFNLEVBQUUsU0FBUztJQUNqQixPQUFPLEVBQUUsS0FBSztJQUNkLFVBQVUsRUFBRSxRQUFRO0lBQ3BCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLFlBQVksRUFBRSxVQUFVO0NBQ3pCLENBQUM7QUFFRixrQkFBZSxDQUFDLFFBQWEsRUFBRSxFQUFFLEVBQUU7SUFDakMsS0FBSyxDQUFDLEtBQUsscUJBQVEsS0FBSyxFQUFLLEtBQUssQ0FBQyxLQUFLLENBQUUsQ0FBQztJQUMzQyxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsa0JBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0MsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDO0lBQ25CLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3RDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNWLE9BQU8sY0FBSSxDQUFDO1FBQ1YsUUFBUSxFQUFFO1lBQ1IsbUJBQVMsbUJBQ0osS0FBSyxJQUNSLEVBQUUsRUFBRSxHQUFHLElBQ1A7WUFDRixlQUFLLENBQUM7Z0JBQ0osS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLEdBQUcsRUFBRSxHQUFHO2dCQUNSLFFBQVEsRUFBRSxDQUFDLGtCQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDcEMsQ0FBQztTQUNIO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsU0FBUyxJQUFJLENBQUMsRUFBTztJQUNuQixRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNsRCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNyQyxhQUFhO1lBQ2IsS0FBSyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksYUFBYSxDQUFDO1FBQ2pGLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRleHRWaWV3IGZyb20gJy4uL2NvcmUvVGV4dFZpZXcnO1xyXG5pbXBvcnQgRmlsZUlucHV0IGZyb20gJy4uL2NvcmUvRmlsZUlucHV0JztcclxuaW1wb3J0IExhYmVsIGZyb20gJy4uL2NvcmUvTGFiZWwnO1xyXG5pbXBvcnQgU3BhbiBmcm9tICcuLi9jb3JlL1NwYW4nO1xyXG5cclxuY29uc3Qgc3R5bGUgPSB7XHJcbiAgd2lkdGg6ICcwLjFweCcsXHJcbiAgaGVpZ2h0OiAnMC4xcHgnLFxyXG4gIG9wYWNpdHk6ICcwJyxcclxuICBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgekluZGV4OiAnIC0xJyxcclxuICBiYWNrZ3JvdW5kQ29sb3I6ICcjRTZFNkU2JyxcclxufTtcclxuXHJcbmNvbnN0IGxhYmVsU3R5bGUgPSB7XHJcbiAgYm9yZGVyUmFkaXVzOiAnNXB4JyxcclxuICBib3JkZXI6ICcxcHggc29saWQgI2NjYycsXHJcbiAgYmFja2dyb3VuZENvbG9yOiAnI0U2RTZFNicsXHJcbiAgd2lkdGg6ICcxMDBweCcsXHJcbiAgbWluSGVpZ2h0OiAnMzBweCcsXHJcbiAgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgcGFkZGluZzogJzVweCcsXHJcbiAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXHJcbiAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChwcm9wczogYW55ID0ge30pID0+IHtcclxuICBwcm9wcy5zdHlsZSA9IHsgLi4uc3R5bGUsIC4uLnByb3BzLnN0eWxlIH07XHJcbiAgcHJvcHMuY2hpbGRyZW4gPSBbVGV4dFZpZXcocHJvcHMubGFiZWwgfHwgJycpXTtcclxuICBkZWxldGUgcHJvcHMubGFiZWw7XHJcbiAgY29uc3QgcmVmID0gcHJvcHMuaWQgfHwgTWF0aC5yYW5kb20oKTtcclxuICBpbml0KHJlZik7XHJcbiAgcmV0dXJuIFNwYW4oe1xyXG4gICAgY2hpbGRyZW46IFtcclxuICAgICAgRmlsZUlucHV0KHtcclxuICAgICAgICAuLi5wcm9wcyxcclxuICAgICAgICBpZDogcmVmLFxyXG4gICAgICB9KSxcclxuICAgICAgTGFiZWwoe1xyXG4gICAgICAgIHN0eWxlOiBsYWJlbFN0eWxlLFxyXG4gICAgICAgIGZvcjogcmVmLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbVGV4dFZpZXcoJ0Nob29zZSBGaWxlJyldLFxyXG4gICAgICB9KSxcclxuICAgIF0sXHJcbiAgfSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBpbml0KGlkOiBhbnkpIHtcclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKF8pID0+IHtcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcclxuICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICBpbnB1dC5uZXh0RWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnQgPSBlLnRhcmdldC5maWxlc1swXS5uYW1lIHx8ICdDaG9vc2UgRmlsZSc7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG4iXX0=