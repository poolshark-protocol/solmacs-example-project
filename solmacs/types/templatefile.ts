import { MacroDef, parseMacroDef, ParseMacroDefRet } from "./macrodef"
import { readFileSync, writeFileSync } from "fs";
import { MacroFile, parseMacroFile } from "./macrofile";

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
        let nextMacroDefIdx  = line.indexOf('!(', searchIdx);
        let nextMacroFileIdx = line.indexOf('#use "', searchIdx);

        if (nextMacroDefIdx != -1) {
            // get macro name
            let preArgsStr        = line.substring(searchIdx, nextMacroDefIdx);
            let macroNameStartIdx = preArgsStr.lastIndexOf(" ") + 1;
            let macroName             = line.substring(macroNameStartIdx, nextMacroDefIdx);
            console.log(macroName);
            // let macroDefRet: ParseMacroDefRet = parseMacroDef(contentLines, i, nextMacroDefIdx + 2);
            // macroDefs.push(macroDefRet.macroDef);
            // i = macroDefRet.lastLine;
            // searchIdx = macroDefRet.lastIdx + 1;
        }
        else if(nextMacroFileIdx != -1){
            let fileName = line.substring(line.lastIndexOf('/')+1, line.lastIndexOf('"'));
            console.log('filename: ' + fileName);
            // let macroFileRet: MacroFile = parseMacroFile('./macros/' + fileName);
            // return {
            //     filePath: path,
            //     macroDefs: [],
            //     macroFiles: []
            // }
            // macroFiles.push(macroFileRet);
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


