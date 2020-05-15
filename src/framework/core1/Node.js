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
    if (!props.id && tag == "input") {
        // x += 1
        // console.log(x)
        //node.setAttribute("id", genId(10))
    }
    return node;
}


function resolveCamelCase(key) {
    return key.replace(/([A-Z])/g, "-$1").toLowerCase();
}