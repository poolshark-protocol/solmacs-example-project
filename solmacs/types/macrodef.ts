import { stringify } from "querystring"
import { Macro } from "./macro"

export interface MacroDef {
    name:       string
    args:       string[]
    startLine:  number
    startIndex: number
    endLine:    number
    endIndex:   number
    macroDefs:  MacroDef[]
}

export interface ParseMacroDefRet {
    macroDef: MacroDef
    lastLine: number
    lastIdx: number
}

export function parseMacroDef(lines: string[], i: number, startIdx: number): void {
    let parenDeep = 1;
    let argCount = 0;

    let defRet: ParseMacroDefRet;
    let macroDef: MacroDef;

    let name: string = '';
    for (let j=startIdx; j > 0; j--) {
        if (
            lines[i][j] == '(' ||
            lines[i][j] == ',' ||
            lines[i][j] == ' ' ||
            lines[i][j] == '\t'
        ) {
            break;
        }
        name = name.concat(lines[i][j]);
    }
    // console.log(name);
    // let splitString = name.split("");
    // let reverseArray = splitString.reverse();
    // let macroDef = reverseArray.join("");

    // console.log(defRet.macroDef.name);

    // defRet.macroDef.startLine = i;
    // defRet.macroDef.startIndex = startIdx;

    // for (; i < lines.length; i++) {
    //     let line = lines[i];

    //     for (let char=startIdx; char < line.length; char++) {
    //         // new macro encountered
    //         if (line[char-1]+line[char] == '!(') {
    //             let macroDef = parseMacroDef(lines, i, char);
    //             defRet.macroDef.macroDefs.push(macroDef.macroDef);
    //         }
    //         //
    //         else if (line[char] == '(' && line[char-1]+line[char] != '!(') {
    //             parenDeep++;
    //         }
    //         else if (line[char] == ')') {
    //             parenDeep--;
    //             defRet.lastIdx = char;
    //             defRet.lastLine = i;
    //             if (parenDeep == 0) {
    //                 defRet.macroDef.endLine = i;
    //                 defRet.macroDef.endIndex = char;
    //                 return defRet;
    //             }
    //         }
    //         else if (line[char] == ',') {
    //             argCount++;
    //         }
    //         else if (line[char] != ' ' && line[char] != '\t') {
    //             if (defRet.macroDef.args[argCount] == null) {
    //                 defRet.macroDef.args[argCount] = line[char];
    //             }
    //             else {
    //                 defRet.macroDef.args[argCount] = defRet.macroDef.args[argCount]+line[char];
    //             }
    //         }
    //     }
    // }
    // macroDef = {
    //     name: name,
    //     args: [],
    //     startLine: i,
    //     startIndex: startIdx,
    //     endLine: i + 1,
    //     endIndex: 0,
    //     macroDefs: []
    // };
    // return {
    //     macroDef: macroDef,
    //     lastLine: 
    // }
}