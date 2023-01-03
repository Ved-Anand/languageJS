function read(tree, elem, variables, functions) {
    if (elem == 0 || tree[elem-1].type == 'newLine') {

        if (tree[elem+1].type == 'literal' && tree[elem+2].type == 'then') {
            
            let startingElem = elem;

            for (var a = elem+3; a < tree.length; a++) { //no support for functions in functions yet 
                if (tree[a].type == "end") {

                    functions.push({
                        name: tree[elem+1].value,
                        start: startingElem,
                        called: false
                    });

                    return a;
                }

            }

            console.log("Could not find end statement for function.");
            process.exit();
            

        } else {
            console.log("Invalid function declaration structure.");
            process.exit();
        }

    }
}

module.exports = {
    read
}