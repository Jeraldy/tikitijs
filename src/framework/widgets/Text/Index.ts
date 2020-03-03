import Span from "../../core/Span"
import TextView from "../../core/TextView"

export default (text: string, style?: {}) => {
    return Span({ children: [TextView(text)], style })
}