import { Macro } from "./macro"

export interface MacroFile {
    filePath:    string
    fileContent: string
    macros:      Macro[]
}

export function createMacroFile(path: string): MacroFile {

    return {
        filePath: path,
        fileContent: "",
        macros: []
    }
}