function read (tree, elem, variables) {
    var aboveQuotes = 0;
    for (var i = 0; i < elem; i++) { //goes to line before this current if statement.
        
        if (tree[i].type == '"""') aboveQuotes++;
        
    }

    if (aboveQuotes%2 != 0) return elem; //if this quote is finishing a pair

    for (var a = elem+1; a < tree.length; a++) { //now comb through entire thing for end statements. 

        if (tree[a].type == '"""') {
            return a-1;
        }

    }

    console.log("Could not find end to multicomment.");
    process.exit();

}

module.exports = {
    read
}