import { createMacroDef, MacroDef, parseMacroDef, ParseMacroDefRet } from "./macrodef"
import { readFileSync, writeFileSync } from "fs";
import { MacroFile, parseMacroFile, ParseMacroFileRet } from "./macrofile";

export interface TemplateFile {
    filePath:    string
    macroDefs:   MacroDef[]
    macroFiles:  MacroFile[]
}

export function createTemplateFile(path: string): TemplateFile {

    const content: string = readTemplateFile(path);

    let contentLines: string[] = content.split("\n");

    let macroDefs: MacroDef[] = new Array<MacroDef>();
    let macroFiles: MacroFile[] = new Array<MacroFile>();

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

        while (true) {

            let nextMacroDefIdx  = line.indexOf('!(', searchIdx);
            let nextMacroFileIdx = line.indexOf('#use "', searchIdx);

            if (nextMacroDefIdx != -1) {
                let macroDefRet: ParseMacroDefRet = parseMacroDef(contentLines, i, nextMacroDefIdx + 2);
                macroDefs.push(macroDefRet.macro);
                i = macroDefRet.lastLine;
                searchIdx = macroDefRet.lastIdx + 1;
            }
            else if(nextMacroFileIdx){
                let fileName = line.substring(line.lastIndexOf('/')+1, line.lastIndexOf('"')-1);
                let macroFileRet: MacroFile = parseMacroFile('./macros/' + fileName);
                macroFiles.push(macroFileRet);
            }
        }
    }

    return {
        filePath: path,
        macroDefs: [],
        macroFiles: []
    }
}

export function readTemplateFile(
    filePath: string
  ): string {
    const fileContent = readFileSync(
      filePath,
      "utf-8"
    );
    return fileContent;
}

let file = "./contracts/WalletBindingWithMacros.sol";
const result = createTemplateFile(file);
console.log("Content:", result)


