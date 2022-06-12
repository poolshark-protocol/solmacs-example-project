import { match } from "assert";
import { start } from "repl";
import { findClosingBracket, findClosingParenthesis } from "../utils/fileparsing";
import { MacroCase, parseMacroCase } from "./macrocase"

export interface Macro {
    name:     string
    cases:    MacroCase[]
}

export function parseMacro(name: string, lines: string[], startLine: number, endLine: number, endIndex: number): Macro {
    let cases: MacroCase[] = new Array<MacroCase>();
    let lineNumber = startLine;
    while(lineNumber < endLine){
        let line = lines[lineNumber];
        let openIdx = line.indexOf('(');
        let argsClosing = findClosingParenthesis(lines, lineNumber, openIdx + 1);
        let caseClosing = findClosingBracket(lines, lineNumber + 1, 0);
        let argsStr = line.substring(openIdx + 1, argsClosing.endIndex - 1);
        console.log(argsStr);
        lineNumber = caseClosing.endLine + 1;
    }
    return {
        name: name,
        cases: cases
    }
}