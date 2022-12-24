function operate(value) {
    // value should look something like: "3+5+6"
    // for simplicity right now will just assume it has no space
    let result;
    let valueParse = value.split('');
    let indexOfMultiply = valueParse.indexOf("*");
    let currentLeft = '';
    let currentRight = '';
    for (var i = 0; i < valueParse.length; i++) { 
        if (i < indexOfMultiply) currentLeft += valueParse[i];
        if (i > indexOfMultiply) currentRight += valueParse[i]; 
    }

    if (!isNaN(currentLeft) && !isNaN(currentRight)) result = Number(currentLeft) * Number(currentRight); // see below 
    if (isNaN(currentLeft) || isNaN(currentRight)) {
        console.log('Cannot multiply two strings');
        process.exit();
    }
    return result;

}

// operate('3*2') returns 6.

module.exports = {
    operate
}