import { stringify } from "querystring"
import { Macro } from "./macro"

export interface MacroDef {
    name:       string
    args:       string[]
    startLine:  number
    startIndex: number
    endLine:    number
    endIndex:   number
}

export function createMacroDef(name: string, args: string[], startLine: number, startIndex: number, endLine: number, endIndex: number): MacroDef {

    return{
        name: name,
        args: args,
        startLine: startLine,
        startIndex: startIndex,
        endLine: endLine,
        endIndex: endIndex
    }
}