function read(tree, elem, variables, functions) {
    let funcAbove = false;
    let funcPlacement;
    let counter = 0;
    for (var i = elem-1; i >= 0; i--) {
        if (tree[i].type == "if") counter++;
        if (tree[i].type == "end") counter--;
        if (tree[i].type == "function" && counter==0) {
            funcPlacement = i;
            funcAbove = true;
            break;
        }
    }
    
    if (funcAbove) {
        for (var a = 0; a < functions.length; a++) {
            if (functions[a].name == tree[funcPlacement+1].value) {
                if (functions[a].called) return functions[a].called;
            }
        }
    }
    return elem;
}

module.exports = {
    read
}