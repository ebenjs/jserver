import { PathType } from './parser.js'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)
export const isFolderOrFile = (filePath: string): PathType => {
  filePath = path.join(_dirname, filePath)

  if (!fs.lstatSync(filePath).isDirectory() && !fs.lstatSync(filePath).isFile()) {
    throw new Error('Path is neither a folder nor a file')
  }

  return fs.lstatSync(filePath).isDirectory() ? PathType.directory : PathType.file
}
