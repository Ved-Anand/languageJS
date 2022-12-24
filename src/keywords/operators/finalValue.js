const math = require("mathjs");
const keywords = require("../../enums").keywords;
const { checkVariables } = require("../../utils/checkVariables");

function finalValue(setValue, tree, variables, elem, mathCheck) {
    let finalValue = '';
    if (mathCheck) {
        finalValue = 0;
        for (var j = setValue; j < tree.length; j++) {
            if (tree[j+elem].type == 'literal') {
              let secondArrayPos = checkVariables(variables, j+elem, tree);
              if (secondArrayPos != undefined) {
                finalValue += Number(variables[secondArrayPos].value);
              } else finalValue += Number(tree[j+elem].value);
            } else if (keywords.includes(tree[j+elem].type)) {
                finalValue += tree[j+elem].type
            } else if (tree[j+elem].type == 'newLine') break;
        }
        finalValue = math.evaluate(String(finalValue));

    } else {
        
        for (var k = setValue; k < tree.length; k++) {
            if (tree[k+elem].type != 'newLine' && (tree[k+elem].type == 'stringLiteral' || tree[k+elem].type == 'literal')) {
                if (tree[k+elem].type == 'literal') {
                    if (isNaN(tree[k+elem].value)) {
                        //check if variable
                        finalValue += String(variables[checkVariables(variables, k+elem, tree)].value);
                    } else finalValue += String(tree[k+elem].value);
                } else finalValue += String(tree[k+elem].value); 
            } else if (tree[k+elem].type == 'newLine') break;
        }
    }

    return finalValue;
}

module.exports = {
    finalValue
}