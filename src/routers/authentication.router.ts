import { Router } from 'express'
import loginHandler from '../handlers/authentication/login.handler'
import validationsEnforceMiddleware from '../middlewares/validations-enforce.middleware'
import LoginRequestSchema from '../schemas/LoginRequest.schema'
import refreshTokenHandler from '../handlers/authentication/refresh-token.handler'
import RefreshTokenRequestSchema from '../schemas/RefreshTokenRequest.schema'
import RefreshTokenBodySchema from '../schemas/RefreshTokenBody.schema'
import logoutHandler from '../handlers/authentication/logout.handler'

const authenticationRouter = Router()

authenticationRouter.post('/login', validationsEnforceMiddleware(LoginRequestSchema), loginHandler)
authenticationRouter.post('/refresh-token', validationsEnforceMiddleware(RefreshTokenRequestSchema), refreshTokenHandler)
authenticationRouter.post('/logout', validationsEnforceMiddleware(RefreshTokenBodySchema), logoutHandler)

export default authenticationRouter