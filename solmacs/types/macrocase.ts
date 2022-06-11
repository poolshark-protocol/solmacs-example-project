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

export function parseMacroCase(caseExp: string, args: string[], startLine: number, endLine: number): MacroCase {
    // already passed in:
    // - matchExp
    // - args
    // - startLine
    // - endLine
    //
    // read through each line and find macroDefs
    // output will be the final string after all inner macros have been resolved
}