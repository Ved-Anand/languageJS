function checkDuplicate(variables, duplicate) {
    for (var i = 0; i < variables.length; i++) {
        if (variables[i].name == duplicate) return i;
    }
    return undefined;
}

module.exports = {
    checkDuplicate
}