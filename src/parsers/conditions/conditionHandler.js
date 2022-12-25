const operations = ["+", "-", "*", "/"];
const math = require ("mathjs");
const { checkVariables } = require("../../utils/checkVariables");

function conditionHandler(value, variables, tree) {

    if (value == 'true') return true
    if (value == 'false') return false

    let valueParse = value.split('');

    let indexOfEquals = valueParse.indexOf("=");
    let leftCond = '';
    let rightCond = '';

    for (var i = 0; i < valueParse.length; i++) { 
        if (i < indexOfEquals) leftCond += valueParse[i];
        if (i > indexOfEquals) rightCond += valueParse[i]; 
    }

    //variables and whatnot early returns
    
    let leftCondParser = leftCond.split(''); //a+3
    let rightCondParser = rightCond.split('');

    if (leftCond == rightCond) return true

    //not great yet because does not account for like multi letter variables. 
    let leftResult = '';
    for (var a of leftCondParser) {
        let leftVarValue = undefined;
        let leftVarPosition = undefined;
        for (var c = 0; c < variables.length; c++) {
            if (variables[c].name == a) {
                leftVarValue = true;
                leftVarPosition = c;
                break
            }
        }
        if (leftVarValue != undefined) {
            leftResult += variables[leftVarPosition].value;

        } else {
            leftResult += a;
        }
    }
    leftCond = leftResult;


    let rightResult = '';
    for (var b of rightCondParser) {
        let rightVarValue = undefined;
        let rightVarPosition = undefined;
        for (var d = 0; d < variables.length; d++) {
            if (variables[d].name == b) {
                rightVarValue = true;
                rightVarPosition = d;
                break
            }
        }
        if (rightVarValue != undefined) {
            rightResult += variables[rightVarPosition].value;

        } else {
            rightResult += b;
        }
    }
    rightCond = rightResult;

    let finalLeftResult = math.evaluate(leftCond);
    let finalRightResult = math.evaluate(rightCond);

    //PUTTING IT ALL TOGETHER

    return (finalLeftResult == finalRightResult) ? true : false
}

module.exports = {
    conditionHandler
}

// conditionHandler(3+3=4+2) returns true for instance because 6=6.
//console.log(conditionHandler("3+3=4+2"));