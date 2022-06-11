import { Macro } from "./macro"
import { MacroDef } from "./macrodef"

export interface MacroCase {
    matchExp:   string
    args:       string[]
    startLine:  number
    endLine:    number
    macroDefs:  MacroDef[]
    output:     string
}

export function parseMacroCase(caseExp: string): MacroCase {

}