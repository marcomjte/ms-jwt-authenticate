import { log } from "console"
import { RequestHandler } from "express"
import jwt from 'jsonwebtoken'
import UnAuthorizedError from "../errors/UnAuthorizedError"
import JwtPayloadSchema from "../schemas/JwtPayload.schema"

let { JWT_SECRET } = process.env
JWT_SECRET = JWT_SECRET as string

const authenticationMiddleware: RequestHandler = (req, res, next) => {
  log('Starting authenticationMiddleware...')
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
    
  if (!token) {
    throw new UnAuthorizedError('No token provided', 'NO_TOKEN')
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {      
      log(' - invalid token detected')
      throw new UnAuthorizedError('Invalid token', 'INVALID_TOKEN')
    }
    const jwtPayload = JwtPayloadSchema.parse(user)
    req.user = {
      email: jwtPayload.email,
      id: jwtPayload.id
    }
    log(' - jwt is valid')
    next();
  });
}

export default authenticationMiddleware