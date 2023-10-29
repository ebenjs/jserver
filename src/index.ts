#!/usr/bin/env node

import 'dotenv/config'
import chalk from 'chalk'
import express, { type Express } from 'express'
import cors from 'cors'
import { logger } from './utils/logger.js'
import { isFolderOrFile } from './utils/helpers.js'
import { PathType } from './utils/parser.js'
import { bindSingleFileRoutes } from './core/routebinder.js'
import boxen from 'boxen'
import { launchText, processedText, processingText, serverStartedText } from './consts/strings.js'

const app: Express = express()
const port: number = 3000

app.use(express.json())
app.use(cors())

const command = process.argv[2]
const path = process.argv[3]

if (command !== 'serve') {
  logger.error(`Unknown command ${command}`)
  process.exit(1)
}

logger.info(boxen(launchText, {
  padding: 0.5,
  margin: 0,
  borderStyle: 'double',
  textAlignment: 'center'
}))

if (isFolderOrFile(path) === PathType.file) {
  logger.info(`${processingText} ${chalk.yellow(path)}`)
  const startTime = performance.now()
  const baseFileName = path.split('/').pop()?.replace(/^.*[\\/]/, '').split('.')[0]
  bindSingleFileRoutes(path, app, baseFileName)
  logger.info(`${processedText}  ${chalk.green(Math.round((performance.now() - startTime) * 100) / 100)} milliseconds`)
}

app.listen(process.env.DEFAULT_SERVER_PORT, () => {
  logger.info(`${serverStartedText} ${process.env.DEFAULT_SERVER_URL}:${port}`)
})
