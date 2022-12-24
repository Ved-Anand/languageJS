let output = false;
const keywords = require("./enums").keywords;

function checkErrors(line, number) {
    const individualTokens = line.split('');
    const elemTokens = line.split(' ');
    
    // check String Quotes Error
    if (getOccurrence(individualTokens, '"') == 1) {
        output = 'Error: Unmatched quotation pair. \nFound on Line #' + number;
    }  
    
    // check Duplicate Keywords
    /*
    for (let i = 0; i < keywords.length; i++) {
        let keywordChecked = keywords[i];
        if (getOccurrence(elemTokens, keywordChecked) > 1) {
            if ((indexOfStartsWith(elemTokens, '"') < elemTokens.indexOf(keywordChecked, elemTokens.indexOf(keywordChecked)+1) && (indexOfEndsWith(elemTokens, '"') > elemTokens.indexOf(keywordChecked, elemTokens.indexOf(keywordChecked)+1)))) {
            } else {
                output = 'Error: Duplicate of same command on same line. \n' + keywordChecked 
                + ' was found ' + getOccurrence(elemTokens, keywordChecked) + ' times instead of the expected 1. \n'
                + 'Occurred on Line #' + number;
            }
        }
    } */

    return output;
}

function indexOfStartsWith(array, value) {
    for (let i = 0; i < array.length; i++) {
        let arrayElem = array[i];
        if (arrayElem.startsWith(value)) return i; 
    }
    return false;
}

function indexOfEndsWith(array, value) {
    for (let i = 0; i < array.length; i++) {
        let arrayElem = array[i];
        if (arrayElem.endsWith(value)) return i;
    }
    return false;
}

function getOccurrence(array, value) {
    let count = 0; 
    array.forEach((v) => (v === value && count++));
    return count;
}

module.exports = {
    checkErrors
}