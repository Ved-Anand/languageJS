function removeSpaces(file) {
    const finalString = '';
    const linesInFile = file.split(/\r?\n/); 
    for (let i = 0; i < linesInFile.length; i++) {
        const line = linesInFile[i];
        const tokens = line.split('');
        for (let j = 0; j < tokens.length; j++) {
            const char = tokens[j];
            if (char == " ") {
                
            }
        }
    }
}