import { log } from "console"
import expressAsyncHandler from "express-async-handler"
import UnAuthorizedError from "../errors/UnAuthorizedError"
import jwt from "jsonwebtoken"

//this function is not enabled because not have jwt

const roleBasedAuthorization = (roles: string[]) => {

  return expressAsyncHandler(async (req, res, next) => { 
    
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      throw new UnAuthorizedError("Not authorized, no token")
    }

    const user = req.user
    if (user 
      // && roles.includes(user.id)
    ) {
      next()
    } else {
      res.status(403)
      throw new Error("Not authorized")
    }
    
    try{
      
      const decodedToken: any = jwt.verify(token, '')
      req.user = decodedToken

      // const permissions = roles.every(role => role === user.id)

    } catch(err) {
      log('Error ')
    }
  })
}