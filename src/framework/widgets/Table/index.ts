import Section from '../../core/Section';
import TextView from '../../core/TextView';
import Footer from '../../core/Footer';
import Span from '../../core/Span';
import Icon from '../../ui/Icon';
import ActionItem from '../../md/AppBars/ActionItem';
import _Table from './_Table';

export default ({ data, titles }: { data: Array<Array<any>>, titles: Array<{ title: string, style: any }> }) => {
    return Section({
        class: "md-ui component-data-table",
        children: [
            new _Table({ data, titles }),
            Footer({
                class: "main-table-footer",
                children: [
                    // Span({
                    //     class: "rows-selection",
                    //     children: [
                    //         Span({ class: "rows-selection-label", children: [TextView("Rows per page:")] }),
                    //         Span({
                    //             class: "rows-selection-dropdown",
                    //             children: [
                    //                 TextView("10"),
                    //                 Icon({ name: "arrow_drop_down" })
                    //             ]
                    //         })
                    //     ]
                    // }),
                    Span({
                        class: "rows-amount",
                        children: [TextView(`Showing: 1-10 of ${data.length}`)]
                    }),
                    Span({
                        class: "table-pagination",
                        children: [
                            ActionItem({ icon: "keyboard_arrow_left" }),
                            ActionItem({ icon: "keyboard_arrow_right" }),
                        ]
                    })
                ]
            })
        ]
    })
}
