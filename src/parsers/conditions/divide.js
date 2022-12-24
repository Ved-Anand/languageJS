function operate(value) {
    // value should look something like: "3+5+6"
    // for simplicity right now will just assume it has no space
    let result;
    let valueParse = value.split('');
    let indexOfDivide = valueParse.indexOf("/");
    let currentLeft = '';
    let currentRight = '';
    for (var i = 0; i < valueParse.length; i++) { 
        if (i < indexOfDivide) currentLeft += valueParse[i];
        if (i > indexOfDivide) currentRight += valueParse[i]; 
    }

    if (!isNaN(currentLeft) && !isNaN(currentRight)) result = Number(currentLeft) / Number(currentRight); // see below 
    if (isNaN(currentLeft) || isNaN(currentRight)) {
        console.log('Cannot divide two strings');
        process.exit();
    }
    return result;

}

// operate('4/2') returns 2.

module.exports = {
    operate
}