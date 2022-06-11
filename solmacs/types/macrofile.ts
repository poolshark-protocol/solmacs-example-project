import { readFileSync } from "fs";
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
        let searchIdx = 0;

        /**
         * ( + openParenCount++
         * ) - openParenCount--
         * , - end of arg with openParentCount == 1
         *
         *
         * MYMACRO!();
         * MYMACRO!(arg1, arg2);
         * MYMACRO!(arg1Macro!(arg2Macro!()), arg2);
         * MYMACRO!(
         *     arg1Macro!(
         *         arg3
         *     ),
         *     arg2
         * );
         * */
        let macroStr    = 'macro_rules! ';
        let nextMacroIdx     = line.indexOf(macroStr, searchIdx);

        if(nextMacroIdx != -1){
            let startLine = i+1;
            while(contentLines[i] != '}'){
                i++;
            }
            let endLine = i-1;
            let macroName = line.substring(nextMacroIdx + macroStr.length, line.length - 1).replace(' ', '').replace('{', '');
            console.log(macroName);
            let macroRet: Macro = parseMacro(macroName, contentLines, startLine, endLine);
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