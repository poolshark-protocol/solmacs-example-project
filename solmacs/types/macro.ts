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
    for(let lineNumber = startLine; lineNumber <= endLine; lineNumber++){
        let line: string = lines[lineNumber].replace(' ','');
        if(line.startsWith('(') && openBracketCount == 0) {
            openBracketCount = 1;
            // find the start and end line of the macro case
            let args = line.substring(1, line.indexOf(')') - 1).split(',');
            let matchExp: string;
            caseStartLine = lineNumber + 1;
            if(!line.startsWith('()')){
                if(line.startsWith('($')){
                    matchExp = '*';
                }
                // else there is a matchExp
                else {
                    matchExp = args[0];
                    args = args.slice(1);
                }

                continue;
                let macroCase: MacroCase = parseMacroCase(matchExp, args, caseStartLine, caseEndLine);
            }
        }
        else(openBracketCount > 0){
            

        }
    }
}