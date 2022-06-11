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
    macro: MacroDef
    lastLine: number
    lastIdx: number
}

export function parseMacroDef(lines: string[], i: number, startIdx: number): ParseMacroDefRet {
    let parenDeep = 1;
    let argCount = 0;

    let defRet: ParseMacroDefRet;

    let name: string;
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
    let splitString = name.split("");
    let reverseArray = splitString.reverse();
    defRet.macro.name = reverseArray.join("");

    console.log(defRet.macro.name);

    defRet.macro.startLine = i;
    defRet.macro.startIndex = startIdx;

    for (; i < lines.length; i++) {
        let line = lines[i];

        for (let char=startIdx; char < line.length; char++) {
            // new macro encountered
            if (line[char-1]+line[char] == '!(') {
                let macroDef = parseMacroDef(lines, i, char);
                defRet.macro.macroDefs.push(macroDef.macro);
            }
            //
            else if (line[char] == '(' && line[char-1]+line[char] != '!(') {
                parenDeep++;
            }
            else if (line[char] == ')') {
                parenDeep--;
                defRet.lastIdx = char;
                defRet.lastLine = i;
                if (parenDeep == 0) {
                    defRet.macro.endLine = i;
                    defRet.macro.endIndex = char;
                    return defRet;
                }
            }
            else if (line[char] == ',') {
                argCount++;
            }
            else if (line[char] != ' ' && line[char] != '\t') {
                if (defRet.macro.args[argCount] == null) {
                    defRet.macro.args[argCount] = line[char];
                }
                else {
                    defRet.macro.args[argCount] = defRet.macro.args[argCount]+line[char];
                }
            }
        }
    }
}