import { match } from "assert";
import { start } from "repl";
import { MacroCase, parseMacroCase } from "./macrocase"

export interface Macro {
    name:     string
    cases:    MacroCase[]
}

export function parseMacro(name: string, lines: string[], startLine: number, endLine: number): Macro {
    let openBracketCount = 0;
    let caseStartLine;
    let caseExp: string;
    let caseArgs: string[];
    let cases: MacroCase[];
    for(let lineNumber = startLine; lineNumber <= endLine; lineNumber++){
        let line: string = lines[lineNumber].replace(' ','');
        if(line.startsWith('(') && openBracketCount == 0) {
            openBracketCount = 1;
            // find the start and end line of the macro case
            caseArgs = line.substring(1, line.indexOf(')') - 1).split(',');
            
            caseStartLine = lineNumber + 1;
            if(!line.startsWith('()')){
                if(line.startsWith('($')){
                    caseExp = '*';
                }
                // else there is a matchExp
                else {
                    caseExp = caseArgs[0];
                    caseArgs = caseArgs.slice(1);
                }

                continue;
               
            }
        }
        else if(openBracketCount > 0) {
            while(true){
                openBracketCount += (line.match(/{/g) || []).length;
                openBracketCount -= (line.match(/}/g) || []).length;
                if(openBracketCount == 0){
                    let caseEndLine = lineNumber - 1;
                    let macroCase: MacroCase = parseMacroCase(caseExp, caseArgs, caseStartLine, caseEndLine);
                    cases.push(macroCase);
                    break;
                }
                else{
                    continue;
                }
            }
        }
    }
    return {
        name: name,
        cases: cases
    }
}