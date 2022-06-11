import { Macro } from "./macro"

export interface MacroCase {
    matchExp: string
    args:     string[]
    content:  string
    macros:   Macro[]
}

export function createMacroCase(caseExp: string): MacroCase {

}