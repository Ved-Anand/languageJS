const { checkVariables } = require("../utils/checkVariables");
const { finalValue } = require("./operators/finalValue");

function read(tree, elem, variables) {
    if (tree[elem+1].type == 'stringLiteral') {
       console.log(finalValue(1, tree, variables, elem));
      } else if (tree[elem+1].type == 'literal') {
        //console.log(variables);
        let arrayPos = checkVariables(variables, elem+1, tree);
        if (arrayPos != undefined) {
            if (typeof variables[arrayPos].value == 'number') console.log(finalValue(1, tree, variables, elem, true));
            if (typeof variables[arrayPos].value == 'string') console.log(finalValue(1, tree, variables, elem));
        } else {
          try {
            console.log(finalValue(1, tree, variables, elem, true));
          } catch (e) {
            console.log("An error in evaluating the expression following the print statement occurred.");
          }
        }
      } else if (tree[elem+1].value == null) {
        console.log('Error: Cannot print null.');
        process.exit();
      } else {
        console.log('Error with print statement.');
        process.exit();
      }
}

module.exports = {
    read
}