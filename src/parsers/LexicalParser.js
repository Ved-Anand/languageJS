const fs = require("fs");
const path = require("path");
const { lineParse, tree } = require("./LineParser");

function parseLex(fileData) {

  let variables = [];
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
    //const keywordNames = fs.readdirSync("C:\\Users\\vedan\\OneDrive\\Documents\\Coding Files\\languageJS\\src\\keywords").filter(d => d.endsWith('.js'));
    let filePath = path.join(__dirname, '../keywords');
    const keywordNames = fs.readdirSync(filePath).filter(d => d.endsWith(".js"));  
    for (let file of keywordNames) {
      let fileName = file.substring(0, file.length-3);
      if (type == fileName || (fileName == "multicomment" && type == '"""')) {
        let pull = require(`../keywords/${fileName}`);
        let output = pull.read(tree, elem, variables);
        if (type == "if" || type == '"""') elem = output;
        
      }
    }
  }
}

module.exports = {
  parseLex
}