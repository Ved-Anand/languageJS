const fs = require("fs");
const { parseLex } = require("./parsers/LexicalParser");

const commands = fs.readdirSync("./tests").filter(d => d.endsWith('.society')); 
let fileData;

for (let file of commands) {
    fileData = fs.readFileSync(`./tests/${file}`, {encoding:'utf8', flag:'r'});
    parseLex(fileData);
}

    