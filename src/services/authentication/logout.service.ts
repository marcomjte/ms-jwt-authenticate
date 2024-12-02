import { log } from "console"
import { refreshTokenRepository } from "../../app/repositories"
import jwt from "jsonwebtoken"
import UnAuthorizedError from "../../errors/UnAuthorizedError"

const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET as string

const logout = async (refreshToken: string) => {
  log('Starting logout...')
  log(' - refreshToken:', refreshToken)

  // validar si el token es valido o no
  const decoded = jwt.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET)
  log(' - decoded:', decoded)

  if (typeof decoded === 'string') throw new UnAuthorizedError('The token is invalid or expired', 'INVALID_REFRESH_TOKEN')
  
  const { id } = decoded
  log(' - id:', id)

  const refreshTokenEntity = await refreshTokenRepository.findOne({ where: { id } })
  log(' - refreshTokenEntity:', refreshTokenEntity)

  if (!refreshTokenEntity || refreshTokenEntity.expiresAt < new Date()) throw new UnAuthorizedError('The token is invalid or expired', 'INVALID_REFRESH_TOKEN')

  await refreshTokenRepository.remove(refreshTokenEntity)
}

export default logout