import { createMacroDef, MacroDef } from "./macrodef"
import { readFileSync, writeFileSync } from "fs";
import { MacroFile } from "./macrofile";

export interface TemplateFile {
    filePath:    string
    macroDefs:   MacroDef[]
    macroFiles:  MacroFile[]
}

export function createTemplateFile(path: string): TemplateFile {

    const content: string = readTemplateFile(path);

    let contentLines: string[] = content.split("\n");

    let macroDefs: MacroDef[] = new Array<MacroDef>();
    let openParenCount = 0;
    let macroName;
    let argsIdx;
    let args: string[];

    for(let i=0; i < contentLines.length; i++) {
        let line = contentLines[i];
        let searchIdx = 0;
        let startIndex; let startLine; let endIndex; let endLine;

        /**
         * ( + openParenCount++
         * ) - openParenCount--
         * , - end of arg with openParentCount == 1
         * 
         * 
         * MYMACRO!();
         * MYMACRO!(arg1, arg2);
         * MYMACRO!(arg1Macro!(), arg2);
         * MYMACRO!(
         *     arg1Marco!(
         *         arg3
         *     ),
         *     arg2
         * );
         * */

        while(true) {
            let nextOpenParenIdx   = line.indexOf('(', searchIdx);
            let nextCloseParenIdx = line.indexOf(')', searchIdx);
            let nextCommaIdx       = line.indexOf(',', searchIdx);

            // ready to parse new macro
            if(openParenCount == 0){
                argsIdx = line.indexOf('!(', searchIdx);

                // get macro name
                let preArgsStr        = line.substring(searchIdx, argsIdx);
                let macroNameStartIdx = preArgsStr.lastIndexOf(" ") + 1;
                macroName             = line.substring(macroNameStartIdx, argsIdx);
                console.log(macroName);

                startLine  = i;
                startIndex = macroNameStartIdx;

                args = new Array<string>();

                if (argsIdx != -1) {
                    nextOpenParenIdx = line.indexOf('(', nextOpenParenIdx+1);
                    if (nextCloseParenIdx < nextOpenParenIdx) {
                        let _srchIdx = argsIdx;
                        while (true) {
                            if (nextCommaIdx == -1 || nextCommaIdx > nextCloseParenIdx) {
                                break;
                            }
                            nextCommaIdx = line.indexOf(',', _srchIdx);
                            args.push(line.substring(_srchIdx, nextCommaIdx - 1));
                        }
                        endLine = i;
                        endIndex = nextCloseParenIdx;
                        const macroDef = createMacroDef(macroName, args, startLine, startIndex, endLine, endIndex);
                        macroDefs.push(macroDef);
                        break;
                    }
                }

                openParenCount = 1;
                searchIdx = argsIdx + 2;
            }
            else if(openParenCount == 1 && nextCommaIdx != -1 && nextCommaIdx < nextOpenParenIdx){
                args.push(line.substring(searchIdx, nextCommaIdx - 1));
            }
            // in process of parsing macro
            else {
                //open = -1 close = -1 -> go to next line
                //open = -1 close > 0 -> check openParenCount
                //open > 0 close > 0 check close < open and openParenCount
                if(nextOpenParenIdx == -1 && nextCloseParenIdx == -1){
                    // go to next line
                    break;
                }
                if(nextOpenParenIdx == -1 && nextCloseParenIdx > 0){
                    openParenCount--;
                }

            }
        }
        // if !( is found take everything until)
        // match name of macro is macro list
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


