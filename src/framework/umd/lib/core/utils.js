"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValue = (id) => {
    // @ts-ignore
    return document.getElementById(id).value;
};
exports.setValue = (params = {}) => {
    //@ts-ignore
    var { id, value } = Object.assign({}, params);
    //@ts-ignore
    document.getElementById(id).value = value;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFhLFFBQUEsUUFBUSxHQUFHLENBQUMsRUFBTyxFQUFFLEVBQUU7SUFDbEMsYUFBYTtJQUNiLE9BQU8sUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDM0MsQ0FBQyxDQUFDO0FBRVcsUUFBQSxRQUFRLEdBQUcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDdEMsWUFBWTtJQUNaLElBQUksRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLHFCQUFRLE1BQU0sQ0FBRSxDQUFDO0lBQ2xDLFlBQVk7SUFDWixRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDNUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGdldFZhbHVlID0gKGlkOiBhbnkpID0+IHtcclxuICAvLyBAdHMtaWdub3JlXHJcbiAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS52YWx1ZTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXRWYWx1ZSA9IChwYXJhbXMgPSB7fSkgPT4ge1xyXG4gIC8vQHRzLWlnbm9yZVxyXG4gIHZhciB7IGlkLCB2YWx1ZSB9ID0geyAuLi5wYXJhbXMgfTtcclxuICAvL0B0cy1pZ25vcmVcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkudmFsdWUgPSB2YWx1ZTtcclxufTtcclxuIl19