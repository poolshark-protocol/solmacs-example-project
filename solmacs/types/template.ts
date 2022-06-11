import { MacroDef } from "./macrodef"
import { readFileSync, writeFileSync } from "fs";
import { MacroFile } from "./macrofile";

export interface TemplateFile {
    filePath:    string
    fileContent: string
    macroFiles:  MacroFile[]
    macroDefs:   MacroDef[]
}

export function createTemplateFile(path: string): TemplateFile {

    const content: string = readTemplateFile(path);

    let contentLines: string[] = content.split("\n");

    for(let i=0; i< contentLines.length)

    return {
        filePath: path,
        fileContent: content,
        macroFiles: [],
        macroDefs: []
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


