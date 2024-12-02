import { log } from "console"
import { ErrorRequestHandler } from "express"
import { ZodError } from "zod"

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  log(' - Starting error handler ')  
  
  if(err.type === 'ZodError') {
    log(' - ZodError detected')
    const error = err.error as ZodError
    return res.status(400).contentType('application/json').send(error.toString())
  } 
  
  if(err.type) {
    log(' - Type: ', err.type)
    return res.status(err.type).json({ message: err.message, code: err.code })
  }

  log(' - Error:', err)

  res.status(500).json({ message: err.toString() })
}

export default errorHandler