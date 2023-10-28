import { PathType } from './parser.js'
import path from 'path'
import fs from 'fs'

export const isFolderOrFile = (filePath: string): PathType => {
  filePath = path.resolve(filePath)

  if (!fs.lstatSync(filePath).isDirectory() && !fs.lstatSync(filePath).isFile()) {
    throw new Error('Path is neither a folder nor a file')
  }

  return fs.lstatSync(filePath).isDirectory() ? PathType.directory : PathType.file
}
