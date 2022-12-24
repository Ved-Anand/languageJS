function operate(value) {
    // value should look something like: "3+5+6"
    // for simplicity right now will just assume it has no space
    let result;
    let valueParse = value.split('');
    let indexOfPlus = valueParse.indexOf("+");
    let currentLeft = '';
    let currentRight = '';
    for (var i = 0; i < valueParse.length; i++) { 
        if (i < indexOfPlus) currentLeft += valueParse[i];
        if (i > indexOfPlus) currentRight += valueParse[i]; 
    }

    if (!isNaN(currentLeft) && !isNaN(currentRight)) result = Number(currentLeft) + Number(currentRight); // see below 
    if (isNaN(currentLeft) || isNaN(currentRight)) result = currentLeft + currentRight; //or condition because if either left or right is a string, end result should be string
    return result;

}

// operate('hi+bruh') returns 'hibruh'

module.exports = {
    operate
}