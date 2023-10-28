import fs from 'fs'
import path from 'path'
import { type ParserInterface } from './parserinterface.js'
import { type ParserResponseObjectType } from './parser.js'

export class JsonParserImpl implements ParserInterface {
  responseObject!: ParserResponseObjectType
  parseFile (filePath: string): ParserResponseObjectType {
    filePath = path.resolve(filePath)
    if (path.extname(filePath) !== '.json') {
      throw new Error('File is not a JSON file')
    }

    let rawData: string = ''
    try {
      rawData = fs.readFileSync(filePath, 'utf8')
    } catch (e: any) {
      throw new Error(e.toString())
    }

    this.responseObject = {
      data: JSON.parse(rawData),
      metadata: {
        path: filePath
      }
    }

    return this.responseObject
  }
}
