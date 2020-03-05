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
const Table_1 = require("../core/Table");
const Thead_1 = require("../core/Thead");
const Th_1 = require("../core/Th");
const TextView_1 = require("../core/TextView");
const Tbody_1 = require("../core/Tbody");
const Td_1 = require("../core/Td");
const Tr_1 = require("../core/Tr");
require("./table.css");
const Div_1 = require("../core/Div");
const TextField_1 = require("./TextField");
const index_1 = require("../tikiti/index");
const Link_1 = require("../core/Link");
const Icon_1 = require("./Icon");
const Button_1 = require("../core/Button");
const utils_1 = require("./utils");
exports.default = (props = {}) => {
    return new _DataTable(props);
};
var DIMS;
(function (DIMS) {
    DIMS[DIMS["SIZE"] = 3] = "SIZE";
})(DIMS || (DIMS = {}));
let DATA = [];
class _DataTable extends index_1.StatefulWidget {
    constructor(props) {
        super();
        // console.log(props)
        DATA = props.data || [];
        this.state = Object.assign({}, props, { query: '', data: DATA.slice(0, DIMS.SIZE) });
        return this.connect();
    }
    handleChange(e) {
        this.setState({
            //@ts-ignore
            query: e.target.value,
        }).then(state => {
            this.filterTable(state.query.toLowerCase());
        });
    }
    filterTable(query) {
        var _data = [];
        DATA.forEach((row) => {
            for (var j = 0; j < row.length; j++) {
                if (typeof row[j] != 'object') {
                    if (row[j]
                        .toString()
                        .toLowerCase()
                        .includes(query)) {
                        _data.push(row);
                        break;
                    }
                }
            }
        });
        this.setState({ data: _data.slice(0, DIMS.SIZE) });
    }
    goToPage(params) {
        this.setState({ data: DATA.slice(params.start, params.end) });
    }
    render() {
        //@ts-ignore
        let _a = Object.assign({}, this.state), { id, titles, data, query } = _a, rest = __rest(_a, ["id", "titles", "data", "query"]);
        id = id || Math.random();
        titles = titles || [];
        data = data || [];
        var thead = [];
        var tbody = [];
        var _tr = [];
        titles.forEach((titleObject = {}) => {
            //@ts-ignore
            let _a = Object.assign({}, titleObject), { title } = _a, otherAttrs = __rest(_a, ["title"]);
            title = title || '';
            _tr.push(Th_1.default(Object.assign({}, otherAttrs, { children: [typeof title === 'object' ? title : TextView_1.default(title)] })));
        });
        thead.push(Tr_1.default({ children: _tr, id: utils_1.genId() }));
        data.forEach((row) => {
            var tr = [];
            row.forEach((d) => {
                d = d || '';
                tr.push(Td_1.default({
                    children: [typeof d === 'object' ? d : TextView_1.default(d)],
                }));
            });
            tbody.push(Tr_1.default({ children: tr, id: utils_1.genId() }));
        });
        return Div_1.default({
            id: utils_1.genId(),
            style: {
                overflowX: 'auto',
                border: '1px solid #ccc',
                padding: '5px',
                borderRadius: '2px',
                boxShadow: '-3px 3px 3px -3px rgba(0,0,0,.5)',
                backgroundColor: 'white',
            },
            children: [
                Div_1.default({
                    style: { height: '20px', fontSize: '20px' },
                    children: [TextView_1.default(`Registered Customers`)],
                }),
                Div_1.default({
                    style: {
                        width: '100%',
                        border: '1px dashed #ccc',
                        marginTop: '5px',
                        marginBottom: '5px',
                    },
                }),
                Div_1.default({
                    children: [
                        Button_1.default({
                            children: [
                                Icon_1.default({
                                    name: 'add',
                                    style: {
                                        display: 'inline-block',
                                        verticalAlign: 'middle',
                                    },
                                }),
                                TextView_1.default('Add New'),
                            ],
                        }),
                        Div_1.default({
                            class: 'search-container',
                            style: {
                                float: 'right',
                            },
                            children: [
                                Icon_1.default({
                                    name: 'search',
                                    style: {
                                        position: 'relative',
                                        top: '5px',
                                        color: '#ccc',
                                    },
                                }),
                                TextField_1.default({
                                    placeholder: 'Search',
                                    style: {
                                        border: 'hidden',
                                        height: '10px',
                                        position: 'relative',
                                        top: '-5px',
                                    },
                                    value: query,
                                    onkeyup: (e) => this.handleChange(e),
                                }),
                            ],
                        }),
                    ],
                }),
                Table_1.default(Object.assign({ id }, rest, { children: [
                        Thead_1.default({
                            children: thead,
                            style: {
                                backgroundColor: '#EEF1F4',
                                fontSize: '12px',
                                color: '#757575',
                                fontFamily: 'Lucida Console',
                            },
                        }),
                        Tbody_1.default({ children: tbody }),
                    ] })),
                FilterInfo(),
                Pagination({ goToPage: (params) => this.goToPage(params) }),
            ],
        });
    }
}
function FilterInfo(params) {
    return Div_1.default({
        style: {
            fontStyle: 'italic',
        },
        children: [TextView_1.default(`Showing ${DIMS.SIZE} out of ${DATA.length}`)],
    });
}
function Pagination(params) {
    //@ts-ignore
    let { len, goToPage } = Object.assign({ len: DATA.length }, params);
    const numPages = Math.floor(len / DIMS.SIZE) + (len % DIMS.SIZE);
    let pages = [];
    let start = 0;
    let end = DIMS.SIZE;
    for (var i = 0; i < numPages; i++) {
        pages.push(Page({ goToPage, start, end, counter: i }));
        start = end;
        end = start + DIMS.SIZE;
    }
    return Div_1.default({
        class: 'pagination',
        style: {
            float: 'right',
            marginTop: '-15px',
        },
        children: [
            Link_1.default({
                href: '#',
                children: [
                    Icon_1.default({
                        name: 'navigate_before',
                        style: {
                            position: 'relative',
                            top: '-4px',
                        },
                    }),
                ],
                style: {
                    height: '18px',
                    width: '15px',
                },
            }),
            ...pages,
            Link_1.default({
                href: '#',
                children: [
                    Icon_1.default({
                        name: 'navigate_next',
                        style: {
                            position: 'relative',
                            top: '-4px',
                        },
                    }),
                ],
                style: {
                    height: '18px',
                    width: '15px',
                },
                onclick: () => {
                    if (start < DATA.length) {
                        //goToPage({ start: start, end: params.end })
                    }
                },
            }),
        ],
    });
}
function Page(params) {
    return Link_1.default({
        href: '#',
        onclick: (e) => params.goToPage({ start: params.start, end: params.end }),
        children: [TextView_1.default(params.counter + 1)],
        id: utils_1.genId(),
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YVRhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3VpL0RhdGFUYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHlDQUFrQztBQUNsQyx5Q0FBa0M7QUFDbEMsbUNBQTRCO0FBQzVCLCtDQUF3QztBQUN4Qyx5Q0FBa0M7QUFDbEMsbUNBQTRCO0FBQzVCLG1DQUE0QjtBQUM1Qix1QkFBcUI7QUFDckIscUNBQThCO0FBQzlCLDJDQUFvQztBQUNwQywyQ0FBaUQ7QUFDakQsdUNBQWdDO0FBQ2hDLGlDQUEwQjtBQUMxQiwyQ0FBb0M7QUFDcEMsbUNBQWdDO0FBRWhDLGtCQUFlLENBQUMsUUFBYSxFQUFFLEVBQUUsRUFBRTtJQUNqQyxPQUFPLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUVGLElBQUssSUFFSjtBQUZELFdBQUssSUFBSTtJQUNQLCtCQUFRLENBQUE7QUFDVixDQUFDLEVBRkksSUFBSSxLQUFKLElBQUksUUFFUjtBQUVELElBQUksSUFBSSxHQUFVLEVBQUUsQ0FBQztBQUVyQixNQUFNLFVBQVcsU0FBUSxzQkFBYztJQUNyQyxZQUFZLEtBQVU7UUFDcEIsS0FBSyxFQUFFLENBQUM7UUFDUixxQkFBcUI7UUFDckIsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLHFCQUNMLEtBQUssSUFDUixLQUFLLEVBQUUsRUFBRSxFQUNULElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQy9CLENBQUM7UUFFRixPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsWUFBWSxDQUFDLENBQVE7UUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNaLFlBQVk7WUFDWixLQUFLLEVBQUUsQ0FBQyxDQUFD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LEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNoRixRQUFRLEVBQUUsQ0FBQyxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEMsRUFBRSxFQUFFLGFBQUssRUFBRTtLQUNaLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGFibGUgZnJvbSAnLi4vY29yZS9UYWJsZSc7XHJcbmltcG9ydCBUaGVhZCBmcm9tICcuLi9jb3JlL1RoZWFkJztcclxuaW1wb3J0IFRoIGZyb20gJy4uL2NvcmUvVGgnO1xyXG5pbXBvcnQgVGV4dFZpZXcgZnJvbSAnLi4vY29yZS9UZXh0Vmlldyc7XHJcbmltcG9ydCBUYm9keSBmcm9tICcuLi9jb3JlL1Rib2R5JztcclxuaW1wb3J0IFRkIGZyb20gJy4uL2NvcmUvVGQnO1xyXG5pbXBvcnQgVHIgZnJvbSAnLi4vY29yZS9Ucic7XHJcbmltcG9ydCAnLi90YWJsZS5jc3MnO1xyXG5pbXBvcnQgRGl2IGZyb20gJy4uL2NvcmUvRGl2JztcclxuaW1wb3J0IFRleHRGaWVsZCBmcm9tICcuL1RleHRGaWVsZCc7XHJcbmltcG9ydCB7IFN0YXRlZnVsV2lkZ2V0IH0gZnJvbSAnLi4vdGlraXRpL2luZGV4JztcclxuaW1wb3J0IExpbmsgZnJvbSAnLi4vY29yZS9MaW5rJztcclxuaW1wb3J0IEljb24gZnJvbSAnLi9JY29uJztcclxuaW1wb3J0IEJ1dHRvbiBmcm9tICcuLi9jb3JlL0J1dHRvbic7XHJcbmltcG9ydCB7IGdlbklkIH0gZnJvbSAnLi91dGlscyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCAocHJvcHM6IGFueSA9IHt9KSA9PiB7XHJcbiAgcmV0dXJuIG5ldyBfRGF0YVRhYmxlKHByb3BzKTtcclxufTtcclxuXHJcbmVudW0gRElNUyB7XHJcbiAgU0laRSA9IDMsXHJcbn1cclxuXHJcbmxldCBEQVRBOiBhbnlbXSA9IFtdO1xyXG5cclxuY2xhc3MgX0RhdGFUYWJsZSBleHRlbmRzIFN0YXRlZnVsV2lkZ2V0IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wczogYW55KSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgLy8gY29uc29sZS5sb2cocHJvcHMpXHJcbiAgICBEQVRBID0gcHJvcHMuZGF0YSB8fCBbXTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIC4uLnByb3BzLFxyXG4gICAgICBxdWVyeTogJycsXHJcbiAgICAgIGRhdGE6IERBVEEuc2xpY2UoMCwgRElNUy5TSVpFKSxcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuY29ubmVjdCgpO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlQ2hhbmdlKGU6IEV2ZW50KSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgIHF1ZXJ5OiBlLnRhcmdldC52YWx1ZSxcclxuICAgIH0pLnRoZW4oc3RhdGUgPT4ge1xyXG4gICAgICB0aGlzLmZpbHRlclRhYmxlKHN0YXRlLnF1ZXJ5LnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmaWx0ZXJUYWJsZShxdWVyeTogc3RyaW5nKSB7XHJcbiAgICB2YXIgX2RhdGE6IGFueVtdID0gW107XHJcbiAgICBEQVRBLmZvckVhY2goKHJvdzogYW55KSA9PiB7XHJcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcm93Lmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiByb3dbal0gIT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgcm93W2pdXHJcbiAgICAgICAgICAgICAgLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICAgIC5pbmNsdWRlcyhxdWVyeSlcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICBfZGF0YS5wdXNoKHJvdyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgZGF0YTogX2RhdGEuc2xpY2UoMCwgRElNUy5TSVpFKSB9KTtcclxuICB9XHJcblxyXG4gIGdvVG9QYWdlKHBhcmFtczogYW55KSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgZGF0YTogREFUQS5zbGljZShwYXJhbXMuc3RhcnQsIHBhcmFtcy5lbmQpIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBsZXQgeyBpZCwgdGl0bGVzLCBkYXRhLCBxdWVyeSwgLi4ucmVzdCB9ID0geyAuLi50aGlzLnN0YXRlIH07XHJcbiAgICBpZCA9IGlkIHx8IE1hdGgucmFuZG9tKCk7XHJcbiAgICB0aXRsZXMgPSB0aXRsZXMgfHwgW107XHJcbiAgICBkYXRhID0gZGF0YSB8fCBbXTtcclxuXHJcbiAgICB2YXIgdGhlYWQ6IGFueVtdID0gW107XHJcbiAgICB2YXIgdGJvZHk6IGFueVtdID0gW107XHJcbiAgICB2YXIgX3RyOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgIHRpdGxlcy5mb3JFYWNoKCh0aXRsZU9iamVjdDogYW55ID0ge30pID0+IHtcclxuICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgIGxldCB7IHRpdGxlLCAuLi5vdGhlckF0dHJzIH0gPSB7IC4uLnRpdGxlT2JqZWN0IH07XHJcbiAgICAgIHRpdGxlID0gdGl0bGUgfHwgJyc7XHJcbiAgICAgIF90ci5wdXNoKFxyXG4gICAgICAgIFRoKHtcclxuICAgICAgICAgIC4uLm90aGVyQXR0cnMsXHJcbiAgICAgICAgICBjaGlsZHJlbjogW3R5cGVvZiB0aXRsZSA9PT0gJ29iamVjdCcgPyB0aXRsZSA6IFRleHRWaWV3KHRpdGxlKV0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGVhZC5wdXNoKFRyKHsgY2hpbGRyZW46IF90ciwgaWQ6IGdlbklkKCkgfSkpO1xyXG4gICAgZGF0YS5mb3JFYWNoKChyb3c6IGFueSkgPT4ge1xyXG4gICAgICB2YXIgdHI6IGFueVtdID0gW107XHJcbiAgICAgIHJvdy5mb3JFYWNoKChkOiBhbnkpID0+IHtcclxuICAgICAgICBkID0gZCB8fCAnJztcclxuICAgICAgICB0ci5wdXNoKFxyXG4gICAgICAgICAgVGQoe1xyXG4gICAgICAgICAgICBjaGlsZHJlbjogW3R5cGVvZiBkID09PSAnb2JqZWN0JyA/IGQgOiBUZXh0VmlldyhkKV0sXHJcbiAgICAgICAgICB9KSxcclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuICAgICAgdGJvZHkucHVzaChUcih7IGNoaWxkcmVuOiB0ciwgaWQ6IGdlbklkKCkgfSkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIERpdih7XHJcbiAgICAgIGlkOiBnZW5JZCgpLFxyXG4gICAgICBzdHlsZToge1xyXG4gICAgICAgIG92ZXJmbG93WDogJ2F1dG8nLFxyXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjY2NjJyxcclxuICAgICAgICBwYWRkaW5nOiAnNXB4JyxcclxuICAgICAgICBib3JkZXJSYWRpdXM6ICcycHgnLFxyXG4gICAgICAgIGJveFNoYWRvdzogJy0zcHggM3B4IDNweCAtM3B4IHJnYmEoMCwwLDAsLjUpJyxcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZScsXHJcbiAgICAgIH0sXHJcbiAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgRGl2KHtcclxuICAgICAgICAgIHN0eWxlOiB7IGhlaWdodDogJzIwcHgnLCBmb250U2l6ZTogJzIwcHgnIH0sXHJcbiAgICAgICAgICBjaGlsZHJlbjogW1RleHRWaWV3KGBSZWdpc3RlcmVkIEN1c3RvbWVyc2ApXSxcclxuICAgICAgICB9KSxcclxuICAgICAgICBEaXYoe1xyXG4gICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IGRhc2hlZCAjY2NjJyxcclxuICAgICAgICAgICAgbWFyZ2luVG9wOiAnNXB4JyxcclxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnNXB4JyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgRGl2KHtcclxuICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgIEJ1dHRvbih7XHJcbiAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgIEljb24oe1xyXG4gICAgICAgICAgICAgICAgICBuYW1lOiAnYWRkJyxcclxuICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgVGV4dFZpZXcoJ0FkZCBOZXcnKSxcclxuICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgRGl2KHtcclxuICAgICAgICAgICAgICBjbGFzczogJ3NlYXJjaC1jb250YWluZXInLFxyXG4gICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICBmbG9hdDogJ3JpZ2h0JyxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICBJY29uKHtcclxuICAgICAgICAgICAgICAgICAgbmFtZTogJ3NlYXJjaCcsXHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAnNXB4JyxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNjY2MnLFxyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBUZXh0RmllbGQoe1xyXG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1NlYXJjaCcsXHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnaGlkZGVuJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxMHB4JyxcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6ICctNXB4JyxcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgdmFsdWU6IHF1ZXJ5LFxyXG4gICAgICAgICAgICAgICAgICBvbmtleXVwOiAoZTogRXZlbnQpID0+IHRoaXMuaGFuZGxlQ2hhbmdlKGUpLFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIFRhYmxlKHtcclxuICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgLi4ucmVzdCxcclxuICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgIFRoZWFkKHtcclxuICAgICAgICAgICAgICBjaGlsZHJlbjogdGhlYWQsXHJcbiAgICAgICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNFRUYxRjQnLFxyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICcxMnB4JyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnIzc1NzU3NScsXHJcbiAgICAgICAgICAgICAgICBmb250RmFtaWx5OiAnTHVjaWRhIENvbnNvbGUnLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBUYm9keSh7IGNoaWxkcmVuOiB0Ym9keSB9KSxcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgRmlsdGVySW5mbygpLFxyXG4gICAgICAgIFBhZ2luYXRpb24oeyBnb1RvUGFnZTogKHBhcmFtczogYW55KSA9PiB0aGlzLmdvVG9QYWdlKHBhcmFtcykgfSksXHJcbiAgICAgIF0sXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEZpbHRlckluZm8ocGFyYW1zPzogYW55KSB7XHJcbiAgcmV0dXJuIERpdih7XHJcbiAgICBzdHlsZToge1xyXG4gICAgICBmb250U3R5bGU6ICdpdGFsaWMnLFxyXG4gICAgfSxcclxuICAgIGNoaWxkcmVuOiBbVGV4dFZpZXcoYFNob3dpbmcgJHtESU1TLlNJWkV9IG91dCBvZiAke0RBVEEubGVuZ3RofWApXSxcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gUGFnaW5hdGlvbihwYXJhbXM/OiBhbnkpIHtcclxuICAvL0B0cy1pZ25vcmVcclxuICBsZXQgeyBsZW4sIGdvVG9QYWdlIH0gPSB7IGxlbjogREFUQS5sZW5ndGgsIC4uLnBhcmFtcyB9O1xyXG4gIGNvbnN0IG51bVBhZ2VzID0gTWF0aC5mbG9vcihsZW4gLyBESU1TLlNJWkUpICsgKGxlbiAlIERJTVMuU0laRSk7XHJcbiAgbGV0IHBhZ2VzID0gW107XHJcbiAgbGV0IHN0YXJ0ID0gMDtcclxuICBsZXQgZW5kID0gRElNUy5TSVpFO1xyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IG51bVBhZ2VzOyBpKyspIHtcclxuICAgIHBhZ2VzLnB1c2goUGFnZSh7IGdvVG9QYWdlLCBzdGFydCwgZW5kLCBjb3VudGVyOiBpIH0pKTtcclxuICAgIHN0YXJ0ID0gZW5kO1xyXG4gICAgZW5kID0gc3RhcnQgKyBESU1TLlNJWkU7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gRGl2KHtcclxuICAgIGNsYXNzOiAncGFnaW5hdGlvbicsXHJcbiAgICBzdHlsZToge1xyXG4gICAgICBmbG9hdDogJ3JpZ2h0JyxcclxuICAgICAgbWFyZ2luVG9wOiAnLTE1cHgnLFxyXG4gICAgfSxcclxuICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgIExpbmsoe1xyXG4gICAgICAgIGhyZWY6ICcjJyxcclxuICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgSWNvbih7XHJcbiAgICAgICAgICAgIG5hbWU6ICduYXZpZ2F0ZV9iZWZvcmUnLFxyXG4gICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG4gICAgICAgICAgICAgIHRvcDogJy00cHgnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgXSxcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgaGVpZ2h0OiAnMThweCcsXHJcbiAgICAgICAgICB3aWR0aDogJzE1cHgnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pLFxyXG4gICAgICAuLi5wYWdlcyxcclxuICAgICAgTGluayh7XHJcbiAgICAgICAgaHJlZjogJyMnLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICBJY29uKHtcclxuICAgICAgICAgICAgbmFtZTogJ25hdmlnYXRlX25leHQnLFxyXG4gICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG4gICAgICAgICAgICAgIHRvcDogJy00cHgnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgXSxcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgaGVpZ2h0OiAnMThweCcsXHJcbiAgICAgICAgICB3aWR0aDogJzE1cHgnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25jbGljazogKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHN0YXJ0IDwgREFUQS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgLy9nb1RvUGFnZSh7IHN0YXJ0OiBzdGFydCwgZW5kOiBwYXJhbXMuZW5kIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSksXHJcbiAgICBdLFxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBQYWdlKHBhcmFtczogYW55KSB7XHJcbiAgcmV0dXJuIExpbmsoe1xyXG4gICAgaHJlZjogJyMnLFxyXG4gICAgb25jbGljazogKGU6IEV2ZW50KSA9PiBwYXJhbXMuZ29Ub1BhZ2UoeyBzdGFydDogcGFyYW1zLnN0YXJ0LCBlbmQ6IHBhcmFtcy5lbmQgfSksXHJcbiAgICBjaGlsZHJlbjogW1RleHRWaWV3KHBhcmFtcy5jb3VudGVyICsgMSldLFxyXG4gICAgaWQ6IGdlbklkKCksXHJcbiAgfSk7XHJcbn1cclxuIl19