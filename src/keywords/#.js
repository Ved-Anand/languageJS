function read (tree, elem, variables) {
    if (elem == 0 || tree[elem-1].type == 'newLine') { //currently for simplicity reasons with variable assignment shenanigans just going to make it have to be at start

        for (var i = elem; i < tree.length; i++) { //start at current elem, go until next line

            if (tree[i].type == 'newLine') {
                return i-1; // will set elem equal to position of newLine where it should then be. i-1 because for loop iterates one
            }
            
        }


    } else {
        console.log("Comment should be at start of line.");  //speaking of what is the difference between console.log and console.error because I have no idea.
        process.exit();
    }
}

module.exports = {
    read
}