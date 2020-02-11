import UnorderedList from "../core/UnorderedList"

const style = {
    listStyleType: 'none',
    margin: '0',
    padding: '8px',
}

export default (props: any = {}) => {
    props.style = { ...style, ...props.style }
    return UnorderedList({
        ...props
    })
}