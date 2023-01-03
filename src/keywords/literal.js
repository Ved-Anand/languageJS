const { e } = require("mathjs");
const { checkVariables } = require("../utils/checkVariables");

function read(tree, elem, variables, functions) {
    if (elem == 0 || tree[elem-1].type == "newLine") {
        if (checkVariables(variables, elem, tree) != undefined) {
            console.log("Currently to modify a variable, you have to still use keyword var. Cannot begin a line with a variable at this time.");
            process.exit();
        } else if (tree[elem].value.endsWith("()")) { 

            let funcName = tree[elem].value.substring(0, tree[elem].value.length - 2);
            var funcBool = undefined;
            for (var i = 0; i < functions.length; i++) {
                if (functions[i].name == funcName) funcBool = i
            }

            if (funcBool != undefined) {
                
                //function call:
                functions[funcBool].called = elem;
                return functions[funcBool].start;

            } else {
                console.log("Couldn't find a function by that name that was called.");
                process.exit();
            }

        } else{
            console.log("Undefined value on a line.");
            process.exit();
        }
    }
    return elem;
}

module.exports = {
    read
}