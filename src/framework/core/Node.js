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

    var style = "";
    if (props.style) {
        var _style = props.style
        for (var key in _style) {
            style += resolveCamelCase(key) + ":" + _style[key] + ";"
        }
        props.style = style
    }

    for (var key of Object.keys(props)) {
        if (typeof props[key] === 'function') {
            if (props[key] !== null) {
                node[key] = props[key]
            }
        }
        else {
            node.setAttribute(key, props[key]);
        }
    }

    return node;
}


function resolveCamelCase(key) {
    return key.replace(/([A-Z])/g, "-$1").toLowerCase();
}