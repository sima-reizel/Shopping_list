import { Request, Response, NextFunction } from 'express'
import fs from 'fs'

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const logMessage = `${new Date().toUTCString()}  : ${req.url}\n`
  fs.appendFile('log.txt', logMessage, (err) => {
    if (err) console.error('Failed to write to log file:', err)
  })
  next()
}

export default requestLogger
