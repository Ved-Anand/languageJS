const { checkVariables } = require("../utils/checkVariables");
const { checkDuplicate } = require("../utils/checkDuplicate");
const math = require("mathjs");
const keywords = require("../enums").keywords;

function read (tree, elem, variables) {
    if (elem == 0 || tree[elem-1].type == "newLine") { //var must start line. 
        // name of var should be a literal. 
        if (tree[elem+1].type == "literal") { 
          if (tree[elem+2].type == "=") {

            //variable should be set equal to a literal like b or another variable or a stringLiteral like "hi"
            if ((tree[elem+3].type == "literal" || tree[elem+3].type == "stringLiteral")) {

              if (tree[elem+3].type == "literal") {

                let arrayPos = checkVariables(variables, elem+3, tree) //function to check if the elem+3 literal is a variable or not

                // if var definition is using another variable: 

                if (arrayPos != undefined) { //arrayPos is undefined if elem+3 isn't a variable. 

                  //if the element after the variable is just another line, then that is the only function (line looks something like: var a = b)
                  if (tree[elem+4].type == "newLine") { 
                    duplicationPush(variables, tree, elem, variables[arrayPos].value);

                    //keywords include operators like +, -, *, / etc. so elem+4 should have to be in keywords
                  } else if (keywords.includes(tree[elem+4].type)) {
                    let value = variables[arrayPos].value;
                    if (typeof value == 'number') {
                      for (var j = 4; j < tree.length; j++) {
                        if (tree[j+elem].type != 'newLine' && tree[j+elem].type == 'literal') {
                          let secondArrayPos = checkVariables(variables, j+elem, tree);
                          if (secondArrayPos != undefined) {
                            value += Number(variables[secondArrayPos].value);
                          } else value += Number(tree[j+elem].value);
                        } else if (tree[j+elem].type == 'newLine') break;
                      }
                    }
                    if (typeof value == 'string') {
                        for (var j = 4; j < tree.length; j++) {
                            if (tree[j+elem].type != 'newLine' && (tree[j+elem].type == 'stringLiteral' || tree[j+elem].type == 'literal')) {
                                let secondArrayPos = checkVariables(variables, j+elem, tree);
                                if (secondArrayPos != undefined) {
                                    value += variables[secondArrayPos].value;
                                } else {
                                    value += String(tree[j+elem].value);
                                }
                            } else if (tree[j+elem].type == 'newLine') break;
                        }
                    }
                    var duplicateArrayPos = checkDuplicate(variables, tree[elem+1].value);
                    duplicationPush(variables, tree, elem, value);
                    /*
                    if (duplicateArrayPos == undefined) { 
                        variables.push({
                            name: tree[elem+1].value,
                            value: value
                        });
                    } else {
                        variables[duplicateArrayPos] = {
                            name: tree[elem+1].value,
                            value: value
                        }
                    } */
                  }

                // no var being set to another var, so instead of var a = b, its something like var a = <integer>
                } else {
                    try {
                      let finalValue = '';
                      for (var k = 3; k < tree.length; k++) {
                        if (tree[k+elem].type == 'literal' || keywords.includes(tree[k+elem].type)) {
                          if (tree[k+elem].type == 'literal') {
                            //check variable.
                            if (isNaN(tree[k+elem].value)) {
                              finalValue += String(variables[checkVariables(variables, k+elem, tree)].value);
                            } else finalValue += String(tree[k+elem].value);
                          } else {
                            if (tree[k+elem].type == '"""' || tree[k+elem].type == '#') break;
                            finalValue += tree[k+elem].type;
                          }
                        } else if (tree[k+elem].type == 'newLine') {break;} else if (tree[k+elem].type == 'stringLiteral') {console.log('Cant convert string to number');process.exit();}
                      }

                      duplicationPush(variables, tree, elem, finalValue, true);

                    } catch(e) {
                      console.log(`An error occurred: \n${e}`);
                      process.exit();
                    }
                }
              } else {
                //line looks something like this: var a = "string"
                try {
                  let finalValue = '';
                  for (var k = 3; k < tree.length; k++) {
                      if (tree[k+elem].type != 'newLine' && (tree[k+elem].type == 'stringLiteral' || tree[k+elem].type == 'literal')) {
                          if (tree[k+elem].type == 'literal') {
                            if (isNaN(tree[k+elem].value)) {
                              //check if variable
                              finalValue += String(variables[checkVariables(variables, k+elem, tree)].value);
                            } else if (!isNaN(tree[k+elem].value)) finalValue += String(tree[k+elem].value);
                          } else finalValue += String(tree[k+elem].value); 
                      } else if (tree[k+elem].type == 'newLine' || tree[k+elem].type == '"""' || tree[k+elem].type == '#') break;
                  }
                  duplicationPush(variables, tree, elem, finalValue);
                } catch (e) {
                  console.log(`An error occurred: \n${e}`);
                  process.exit();
                }
              }
            } else {
              console.log('Error: Variable incorrectly defined. Check what value it is set to.');
              process.exit();
            }
          } else {
            console.log('Error: Variable incorrectly defined. Missing equals sign?');
            process.exit();
          }
        } else {
          console.log('Error: Invalid or missing variable name.');
          process.exit();
        }
    } else {
        console.log('Error: Hanging variable, var must be at beginning of a line.');
        process.exit();
    }
}

module.exports = {
    read
}

function duplicationPush(variables, tree, elem, finalValue, mathCheck) {
  var duplicateArrayPos;
  if (mathCheck) {
    duplicateArrayPos = checkDuplicate(variables, tree[elem+1].value);
    if (duplicateArrayPos == undefined) { 
        variables.push({
            name: tree[elem+1].value,
            value: math.evaluate(finalValue)
        });
    } else {
        variables[duplicateArrayPos] = {
            name: tree[elem+1].value,
            value: math.evaluate(finalValue)
        }
    }
  } else {
    duplicateArrayPos = checkDuplicate(variables, tree[elem+1].value);
    if (duplicateArrayPos == undefined) { 
        variables.push({
            name: tree[elem+1].value,
            value: finalValue
        });
    } else {
        variables[duplicateArrayPos] = {
            name: tree[elem+1].value,
            value: finalValue
        }
    }
  }
}