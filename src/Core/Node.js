export default (props = {}, tag) => {
    var node = document.createElement(tag);

    if (props.children) {
        props.children.forEach(child => {
            if (child !== null) {
                node.appendChild(child)
            }
        });
        delete props.children
    }


    for (var key of Object.keys(props)) {
        if (typeof props[key] === 'function') {
            if (props[key] !== null) {
                node[key] = props[key]
            }
        } else {
            node.setAttribute(key, props[key]);
        }
    }

    return node;
}
