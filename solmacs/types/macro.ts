import { MacroCase } from "./macrocase"

export interface Macro {
    name:     string
    filePath: string
    cases:    MacroCase[]
}

export function createMacro(content: string): Macro {
    let newMacro = { name: _name}
    //read from macro
}