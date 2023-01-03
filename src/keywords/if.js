const { conditionHandler } = require("../parsers/conditions/conditionHandler"); 
const keywords = require("../enums").keywords;

function read (tree, elem, variables) {

    if (elem==0 || tree[elem-1].type == 'newLine') {  //must start line not be like in the middle 
        if (tree[elem+1].type == 'literal') { //for now no support for strings in if statements (added later)
            try {
                let conditionValue = '';
                if (tree[elem+2].type == "then") {
                    conditionValue = conditionHandler(tree[elem+1].value, variables, tree, elem);
                } else {
                    for (var i = elem+1; i < tree.length; i++) {
                        if (tree[i].type == "then") {
                            if (conditionValue == '') {
                                console.log("Could not find condition for if statement.");
                                process.exit();
                            }
                            conditionValue = conditionHandler(conditionValue, variables, tree, elem);
                            break
                        } 
                        if (tree[i].type == "newLine") {
                            console.log("Could not find then statement.");
                            process.exit();
                        }
                        if (tree[i].type == "literal") conditionValue = conditionValue + tree[i].value;
                        if (keywords.includes(tree[i].type)) conditionValue = conditionValue + tree[i].type;
                    }
                }
                
                if (conditionValue) { //condition true

                    //do nothing bc it should just run the following lines

                } else {

                    //elem needs to jump to the end statement.

                    //first check if there are above if statements.
                    var aboveIfs = 0;

                    for (var i = 0; i < elem; i++) { //goes to line before this current if statement.
                        
                        if (tree[i].type == "if") aboveIfs++;
                        if (tree[i].type == "function") aboveIfs++;
                        
                    }

                    let endStatements = [];

                    for (var a = 0; a < elem; a++) { //comb through before if for ends

                        if (tree[a].type == "end") aboveIfs-- //if above if has an above end then dont matter

                    }

                    let ifSighted = false;
                    for (var a = elem+1; a < tree.length; a++) { //now comb through after if for ends
                        if (tree[a].type == "if" || tree[a].type == "function") ifSighted = true;
                        if (tree[a].type == "end") endStatements.push(a) //push index of end statement
                        if (tree[a].type == "end" && !ifSighted) {
                            return a;
                        }
                    }

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