import { JsonParserImpl } from '../utils/jsonparserimpl.js'
export const exposeJsonData = (filePath: string): object[] => {
  return new JsonParserImpl().parseFile(filePath).data
}
