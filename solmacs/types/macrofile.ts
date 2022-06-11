import { Macro } from "./macro"

export interface MacroFile {
    filePath:    string
    macros:      Macro[]
}

export function createMacroFile(path: string): MacroFile {

    return {
        filePath: path,
        macros: []
    }
}