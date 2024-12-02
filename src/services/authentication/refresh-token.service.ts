import { log } from "console"
import jwt from 'jsonwebtoken'
import UnAuthorizedError from "../../errors/UnAuthorizedError"
import JwtPayloadSchema from "../../schemas/JwtPayload.schema"
import { refreshTokenRepository } from "../../app/repositories"
import { emitTokens } from "./login.service"

let { JWT_REFRESH_TOKEN_SECRET } = process.env
JWT_REFRESH_TOKEN_SECRET = JWT_REFRESH_TOKEN_SECRET as string

interface TokensResponse {
  accessToken: string
  refreshToken: string
}

const refreshToken = async (token: string): Promise<TokensResponse> => {
  log('Starting refreshTokenService...')
  log(' - token:', token)

  const promise = new Promise<TokensResponse>((resolve, reject) => {
    log(' - verifying token...')
    jwt.verify(token, JWT_REFRESH_TOKEN_SECRET, async (err, user) => {
      log(' - token verified')
      if (err) {
        log(' - invalid refresh token detected')
        return reject(new UnAuthorizedError('Invalid refresh token', 'INVALID_REFRESH_TOKEN'))
      }
      log(' - token is valid')
      log(' - user:', user)
      log(' - parsing token')
      const jwtPayload = JwtPayloadSchema.parse(user)
      log(' - token parsed')
      const { email, id } = jwtPayload
      const refreshToken = await refreshTokenRepository.findOne({ where: { id } })
      if (!refreshToken) {
        log(' - refresh token not found')
        return reject(new UnAuthorizedError('Refresh token not found', 'REFRESH_TOKEN_NOT_FOUND'))
      }

      refreshTokenRepository.remove(refreshToken)
      const newTokens = await emitTokens(email, id)

      resolve(newTokens)
    })
  }) 

  const tokens = await promise
  return tokens
}

export default refreshToken