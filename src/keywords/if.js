const { conditionHandler } = require("../parsers/conditions/conditionHandler"); 

function read (tree, elem, variables) {

    if (elem==0 || tree[elem-1].type == 'newLine') {  //must start line not be like in the middle 
        if (tree[elem+1].type == 'literal' && tree[elem+2].type == 'then') { //for now no support for strings in if statements (added later)
            try {
                if (conditionHandler(tree[elem+1].value, variables, tree, elem)) { //condition true

                    //do nothing bc it should just run the following lines

                } else {

                    //elem needs to jump to the end statement.

                    //first check if there are above if statements.
                    var aboveIfs = 0;

                    for (var i = 0; i < elem; i++) { //goes to line before this current if statement.
                        
                        if (tree[i].type == "if") aboveIfs++;
                        
                    }

                    let endStatements = [];

                    for (var a = 0; a < elem; a++) { //comb through before if for ends

                        if (tree[a].type == "end") aboveIfs-- //if above if has an above end then dont matter

                    }

                    let ifSighted = false;
                    for (var a = elem+1; a < tree.length; a++) { //now comb through after if for ends
                        if (tree[a].type == "if") ifSighted = true;
                        if (tree[a].type == "end") endStatements.push(a) //push index of end statement
                        if (tree[a].type == "end" && !ifSighted) {
                            return a;
                        }
                    }

                    let belowIfs = [];
                    for (var t = elem; t < tree.length; t++) { //now comb through after if for ends

                        if (tree[t].type == "if") belowIfs.push(t) //push index of end statement

                    }

                    // 13, 9, 15

                    if (endStatements.length > 0) {
                        elem = endStatements[endStatements.length - 1 - aboveIfs]; //set position to default last end statement, if aboveIfs is 1 go to second to last and so on
                    } else {
                        console.log("Could not find end statement.");
                        process.exit();
                    }

                }
            } catch (e) {
                console.error(e);
                //console.log(`An error occurred in the evalulation of the if statement condition: \n${e}`);
                process.exit();
            }
        } else {
            console.log("invalid if statement structure.");
            process.exit();
        }
    }
    return elem;

}

module.exports = {
    read
}