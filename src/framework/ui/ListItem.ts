import ListItem from "../core/ListItem"

const style={
    padding:'8px',
    border: '1px solid #ccc',
    width:'200px',
}

export default (props: any = {})=>{
    props.style = { ...style, ...props.style }
    return ListItem({
        ...props
    })
}