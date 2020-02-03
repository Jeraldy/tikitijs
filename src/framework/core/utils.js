export const getValue = (id) => {
    return document.getElementById(id).value;
}

export const setValue = (params = {}) => {
    var { id, value } = { ...params }
    document.getElementById(id).value = value;
}

