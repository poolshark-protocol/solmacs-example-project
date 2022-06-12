import { readFileSync } from "fs";
import { exit } from "process";
import { findClosingBracket } from "../utils/fileparsing";
import { Macro, parseMacro } from "./macro"
import { parseMacroDef, ParseMacroDefRet } from "./macrodef";

export interface MacroFile {
    path:    string
    macros:  Macro[]
}


export function parseMacroFile(path: string): MacroFile {
    const content: string = readMacroFile(path);

    let contentLines: string[] = content.split("\n");

    let macros: Macro[] = new Array<Macro>();

    for(let i=0; i < contentLines.length; i++) {
        let line = contentLines[i];
        let searchIdx        = 0;
        let macroStr         = 'macro_rules! ';
        let nextMacroIdx     = line.indexOf(macroStr, searchIdx);

        if(nextMacroIdx != -1){
            let startLine = i+1;
            console.log(startLine+1);
            let closing = findClosingBracket(contentLines, startLine, 0);
            let endLine = closing.endLine-1;
            let endIndex = closing.endIndex;
            let macroName = line.substring(nextMacroIdx + macroStr.length, line.length - 1).replace(' ', '').replace('{', '');
            console.log(macroName);
            console.log(endLine+1);
            let macroRet: Macro = parseMacro(macroName, contentLines, startLine, endLine, endIndex);
            macros.push(macroRet);
        }
    }

    return {
        path: path,
        macros: macros
    }
}

export function readMacroFile(
    filePath: string
  ): string {
    const fileContent = readFileSync(
      filePath,
      "utf-8"
    );
    return fileContent;
}