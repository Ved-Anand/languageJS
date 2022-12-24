const operations = ["+", "-", "*", "/"];
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
    /*
    if (leftCond == rightCond) return true
    let leftVariableComplexity, rightVariableComplexity = false;
    for (var u of operations) { 
        if (leftCond.includes(u)) leftVariableComplexity = true
        if (rightCond.includes(u)) rightVariableComplexity = true
    }
    if (!leftVariableComplexity) {
        let leftVarValue = checkVariables(variables, leftCond, tree);
        if (leftVarValue != undefined) leftCond = variables[leftVarValue].value;
    } 
    if (!rightVariableComplexity) {
        let rightVarValue = checkVariables(variables, rightCond);
        if (rightVarValue != undefined) rightCond = variables[rightVarValue].value;
    }
    */


    //ok parsing 
    let leftCondParser = leftCond.split('');
    let rightCondParser = rightCond.split('');

    let currentText = '';
    let finalLeftResult;
    let operationHandle = true;
    let operation = '';
    let operationChar = '';

    //LEFT

    for (var i = 0; i < leftCondParser.length; i++) {
        if (!isNaN(leftCondParser[i])) {
            currentText += leftCondParser[i]; //result: 1, 1-1
            if (i == leftCondParser.length - 1 && operationHandle == false) {
                let pull = require(`./${operation}`);
                (finalLeftResult != undefined) ? finalLeftResult += pull.operate(currentText) : finalLeftResult = pull.operate(currentText)
                currentText = '';
                operationHandle = true;
                operation = '';
                operationChar = '';
            } else if (i == leftCondParser.length - 1 && operationHandle == true) {
                let onlyNumber = false
                for (var t of operations) { //just discovered of is a thing in javascript (i only thought it was in like python)
                    if (leftCond.includes(t)) onlyNumber = true
                }
                if (onlyNumber) {
                    let pull = require(`./${operation}`);
                    finalLeftResult = pull.operate(String(finalLeftResult) + operationChar + currentText );
                    currentText = '';
                    operationHandle = true;
                    operation = '';
                    operationChar = '';
                } else finalLeftResult = Number(currentText);
            } else {
                continue;
            }
        }
        if (operations.includes(leftCondParser[i]) && operationHandle==true) {
            operationHandle = false;
            currentText += leftCondParser[i];
            switch (leftCondParser[i]) {
                case "+":
                    operation = "add";
                    operationChar = "+";
                    break
                case "-":
                    operation = "subtract";
                    operationChar = "-";
                    break
                case "*":
                    operation = "multiply"
                    operationChar = "*";
                    break
                case "/":
                    operation = "divide"
                    operationChar = "/";
                    break
            }
        } else if (operations.includes(leftCondParser[i]) && operationHandle == false) {
            let pull = require(`./${operation}`);
            (finalLeftResult != undefined) ? finalLeftResult += pull.operate(currentText) : finalLeftResult = pull.operate(currentText)
            //console.log(finalLeftResult);
            currentText = '';
            switch (leftCondParser[i]) {
                case "+":
                    operation = "add";
                    operationChar = "+";
                    break
                case "-":
                    operation = "subtract";
                    operationChar = "-";
                    break
                case "*":
                    operation = "multiply"
                    operationChar = "*";
                    break
                case "/":
                    operation = "divide"
                    operationChar = "/";
                    break
            }
            
            operationHandle = true;
        }
    }

    //RIGHT

    let finalRightResult;
    currentText = '';
    operationHandle = true;
    operation = '';
    operationChar = '';

    for (var w = 0; w < rightCondParser.length; w++) {
        if (!isNaN(rightCondParser[w])) {
            currentText += rightCondParser[w];
            if (w == rightCondParser.length - 1 && operationHandle == false) {
                let pull = require(`./${operation}`);
                (finalRightResult != undefined) ? finalRightResult += pull.operate(currentText) : finalRightResult = pull.operate(currentText)

                currentText = '';
                operationHandle = true;
                operation = '';
                operationChar = '';
            } else if (w == rightCondParser.length - 1 && operationHandle == true) {
                let onlyNumber = false
                for (var t of operations) { //just discovered of is a thing in javascript (i only thought it was in like python)
                    if (rightCond.includes(t)) onlyNumber = true
                }
                if (onlyNumber) {
                    let pull = require(`./${operation}`);
                    finalRightResult = pull.operate(String(finalRightResult) + operationChar + currentText );
                    currentText = '';
                    operationHandle = true;
                    operation = '';
                    operationChar = '';
                } else finalRightResult = Number(currentText);
            } else {
                continue;
            }
        }
        if (operations.includes(rightCondParser[w]) && operationHandle==true) {
            operationHandle = false;
            currentText += rightCondParser[w];
            switch (rightCondParser[w]) {
                case "+":
                    operation = "add";
                    operationChar = "+";
                    break
                case "-":
                    operation = "subtract";
                    operationChar = "-";
                    break
                case "*":
                    operation = "multiply"
                    operationChar = "*";
                    break
                case "/":
                    operation = "divide"
                    operationChar = "/";
                    break
            }
        } else if (operations.includes(rightCondParser[w]) && operationHandle == false) {
            let pull = require(`./${operation}`);
            (finalRightResult != undefined) ? finalRightResult += pull.operate(currentText) : finalRightResult = pull.operate(currentText) // just realized ternaries exist
            currentText = '';
            switch (rightCondParser[w]) {
                case "+":
                    operation = "add";
                    operationChar = "+";
                    break
                case "-":
                    operation = "subtract";
                    operationChar = "-";
                    break
                case "*":
                    operation = "multiply"
                    operationChar = "*";
                    break
                case "/":
                    operation = "divide"
                    operationChar = "/";
                    break
            }
            operationHandle = true;
        }
    }

    //console.log(finalLeftResult);
    //console.log(finalRightResult);
    //PUTTING IT ALL TOGETHER

    return (finalLeftResult == finalRightResult) ? true : false
}

module.exports = {
    conditionHandler
}

// conditionHandler(3+3=4+2) returns true for instance because 6=6.