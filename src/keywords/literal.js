const { e } = require("mathjs");
const { checkVariables } = require("../utils/checkVariables");

function read(tree, elem, variables) {
    if (elem == 0 || tree[elem-1].type == "newLine") {
        if (checkVariables(variables, elem, tree) != undefined) {
            console.log("Currently to modify a variable, you have to still use keyword var. Cannot begin a line with a variable at this time.");
            process.exit();
        } else {
            console.log("Undefined value on a line.");
            process.exit();
        }
    }
}

module.exports = {
    read
}