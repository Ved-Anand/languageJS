const errorCheck = require("../ErrorHandler");
const keywords = require("../enums").keywords;
const tree = [];

function lineParse(line, lineNumber) {
    line = line.trim(); //eliminate forward and backward useless white space 
    if (line=="") return //ignore empty lines
    const tokens = line.split(" ");
    let result = errorCheck.checkErrors(line, lineNumber);
    if (result) {
      console.log(result);
      return false;
    }
    //keep track of what is in quotes and what is not 
    let inStringLiteral = false;
    let currentStringLiteral = '';
  
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]; // individual word in a line determined by spacing
  
      // if the word is a keyword like print
      if (keywords.includes(token) && (!inStringLiteral)) { 
        tree.push({
          type: token,
          value: null
        });
      
      // if in quotes 
      } else if (inStringLiteral) {
        currentStringLiteral = currentStringLiteral + ' ' + token; //add to existing code in string
        if (token.endsWith('"')) { // if end
          inStringLiteral = false;
          tree.push({
            type: "stringLiteral",
            value: currentStringLiteral.slice(1, -1)
          });
          currentStringLiteral = '';
        } // if not just continue since currentStringLiteral already added
        
      // if quote start   
      } else if (token[0] == '"') {
        if (token.endsWith('"') && token.length > 1) {
          let quoteOccurrence = token.split('"').length-1 // number of times " appears in the thing
          let value = token.slice(1,-1);
          let addOffset = token.indexOf('"', 1);
          let subtractOffset = 0;
          for (var m = 2; m < quoteOccurrence; m++) {
            //value = value.splice(token.indexOf('"', m), 1)
            //value = value.substr(0, token.indexOf('"', m)-1) + value.substr(token.indexOf('"', m), value.length);
            value = value.slice(0, addOffset-subtractOffset-1) + value.slice(addOffset-subtractOffset);
            addOffset = token.indexOf('"', addOffset+1);
            subtractOffset++;
          }
          tree.push({
            type: "stringLiteral",
            value: value
          });
        } else {
          inStringLiteral = true;
          currentStringLiteral = token;
        }
      
      // if word is some random thing not in quotes and not a keyword. 
      } else {
        tree.push({
          type: "literal",
          value: token
        });
      }
    }
    tree.push({
        type: "newLine",
        value: null
    });
}

module.exports = {
    lineParse,
    tree
};