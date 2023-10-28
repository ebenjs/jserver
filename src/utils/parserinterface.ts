import { type ParserResponseObjectType } from './parser.js'

export interface ParserInterface {
  responseObject: ParserResponseObjectType
  parseFile: (filePath: string) => ParserResponseObjectType
}
