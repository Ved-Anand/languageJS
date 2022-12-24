function checkVariables(variables, name, tree) {
    for (let i = 0; i < variables.length; i++) {
        if (variables[i].name == tree[name].value) return i;
    }
    return undefined
}

module.exports = {
    checkVariables
}