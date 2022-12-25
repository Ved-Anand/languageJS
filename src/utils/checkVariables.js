function checkVariables(variables, name, tree) {
    if (variables == undefined) return undefined;
    for (let i = 0; i < variables.length; i++) {
        if (tree[name] == undefined) return undefined;
        if (variables[i].name == tree[name].value) return i;
    }
    return undefined
}

module.exports = {
    checkVariables
}