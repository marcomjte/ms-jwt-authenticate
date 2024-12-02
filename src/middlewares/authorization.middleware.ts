import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import authenticationMiddleware from "./authentication-handler.middleware";
import { log } from "console";
import getUserPermissions from "../adapters/users/get-user-permissions.adapter";
import UnAuthorizedError from "../errors/UnAuthorizedError";


const authorizationMiddleware = (permission: string) => {
  const middleware: RequestHandler = (req, res, next) => { 
    log('Starting authorization middleware')

    const { id: userId } = req.user
    log(' - userId', userId)
    getUserPermissions(+userId).then( data =>{
      log(' - permissions', permission)
      if( !data.includes(permission)) {
        return res.status(401).send('User does not have permission to perform this action')
      }
      next()
    })
  }
  return expressAsyncHandler(middleware)
}

export default authorizationMiddleware
