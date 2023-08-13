import fs from 'graceful-fs'
import { promisify } from 'node:util'

export const readFileAsync = promisify(fs.readFile)
