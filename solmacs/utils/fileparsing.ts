export interface findClosingRet{
    endLine:  number
    endIndex: number
}

export function findClosingParenthesis(lines: string[], startLine: number, startIdx: number) {
    let openCount = 1;
    let openChar = '(';
    let closeChar = ')';
    let lineNumber = startLine;
    let charIdx = startIdx
    while(lineNumber < lines.length){
        let line = lines[lineNumber];
        for(let char = startIdx; char < lines[lineNumber].length; char++){
            if(line[char] == openChar){
                openCount++;
            }
            else if(line[char] == closeChar){
                openCount--;
            }
            if(openCount == 0){
                return {
                    endLine: lineNumber,
                    endIndex: char
                }
            }
        }
        lineNumber++;
        startIdx = 0;
    }
    return {
        endLine: startLine,
        endIndex: startIdx
    }
}

export function findClosingBracket(lines: string[], startLine: number, startIdx: number) {
    let openCount = 1;
    let openChar = '{';
    let closeChar = '}';
    let lineNumber = startLine;
    let charIdx = startIdx
    while(lineNumber < lines.length){
        let line = lines[lineNumber];
        for(let char = startIdx; char < lines[lineNumber].length; char++){
            if(line[char] == openChar){
                openCount++;
            }
            else if(line[char] == closeChar){
                openCount--;
            }
            if(openCount == 0){
                return {
                    endLine: lineNumber,
                    endIndex: char
                }
            }
        }
        lineNumber++;
        startIdx = 0;
    }
    return {
        endLine: startLine,
        endIndex: startIdx
    }
}

// let test = '{mytest{}}';
// let ret = findClosingBracket([test], 0, 1);
// console.log(ret);
