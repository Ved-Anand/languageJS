const fs = require("fs");
const path = require("path");
const { lineParse, tree } = require("./LineParser");

function parseLex(fileData) {

  let variables = [];
  let functions = [];

  //split by new line 
  const linesInFile = fileData.split(/\r?\n/); 
  let lineNumber = 0;

  for (let i = 0; i < linesInFile.length; i++) {
    let line = linesInFile[i];
    lineNumber++;

    if (lineParse(line, lineNumber) == false) process.exit();
  }

  for (let elem = 0; elem < tree.length; elem++) {

    let type = tree[elem].type;
    //console.log(type);

    //print Handling (should be followed by stringLiteral or number literal)
    let filePath = path.join(__dirname, '../keywords');
    const keywordNames = fs.readdirSync(filePath).filter(d => d.endsWith(".js"));  
    for (let file of keywordNames) {
      let fileName = file.substring(0, file.length-3);
      if (type == fileName || (fileName == "multicomment" && type == '"""')) {
        let pull = require(`../keywords/${fileName}`);
        let output = pull.read(tree, elem, variables, functions);

        if (type == "if" || type == '"""' || type == "#" || type == "function" || type == "literal" || type == "end") elem = output; //these 3 types specifically edit the elem value by adding to it and then returning
        
      }
    }
  }
}

module.exports = {
  parseLex
}
