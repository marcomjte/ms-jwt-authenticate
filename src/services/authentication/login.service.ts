import { log } from "console"
import { refreshTokenRepository, userRepository } from "../../app/repositories"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UnAuthorizedError from "../../errors/UnAuthorizedError"
import NotFoundError from "../../errors/NotFoundError"
import ForbiddenError from "../../errors/ForbiddenError"
import TooManyRequestsError from "../../errors/TooManyRequestsError"
import BadRequestError from "../../errors/BadRequestError"

const JWT_REFRESH_TOKEN_EXPIRATION = process.env.JWT_REFRESH_TOKEN_EXPIRATION ? parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION) : 30 * 60 * 1000 // 30 minutes
const JWT_REFRESH_TOKEN_EXPIRATION_EXPRESSION = process.env.JWT_REFRESH_TOKEN_EXPIRATION_EXPRESSION ? process.env.JWT_REFRESH_TOKEN_EXPIRATION_EXPRESSION : '30m'
const JWT_EXPIRATION = process.env.JWT_EXPIRATION ? process.env.JWT_EXPIRATION : '24h'

log('- JWT_EXPIRATION', JWT_EXPIRATION)

let { JWT_SECRET } = process.env
JWT_SECRET = JWT_SECRET as string

let { JWT_REFRESH_TOKEN_SECRET } = process.env
JWT_REFRESH_TOKEN_SECRET = JWT_REFRESH_TOKEN_SECRET as string

interface TokensResponse {
  accessToken: string
  refreshToken: string
}

const login = async (email: string, password: string): Promise<TokensResponse> => {
  log('Starting loginService...')
  log(' - email:', email)
  log(' - password:', password)

  const user = await userRepository.findOne({ where: { email } })

  if (!user) {
    throw new NotFoundError(`Not found user with email: ${email}`, 'invalid_user')
  }

  if (!user.password) {
    throw new BadRequestError(`User with email: ${email} need to set password`, 'invalid_user')
  }

  if (user.status === 'blocked') {
    throw new ForbiddenError(`User with email: ${email} is actually blocked`, 'blocked_user')
  }

  const now = new Date()
  const oneHourInMillis = 3600000

  // Check if the user's failed login attempts, first & last failed login date should be reset
  if (user.firstFailedLoginDate && (now.getTime() - new Date(user.firstFailedLoginDate).getTime()) >= oneHourInMillis) {
    user.failedLoginAttempts = 0
    user.firstFailedLoginDate = null
    user.lastFailedLoginDate = null
    await userRepository.save(user)
  }

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {   
    // Handle failed login attempts
    if (user.failedLoginAttempts === null || user.failedLoginAttempts === 0) {
      user.failedLoginAttempts = 1
      user.firstFailedLoginDate = now // Set firstFailedLoginDate only if failedLoginAttempts is null or 0
    } else {
      user.failedLoginAttempts += 1
    }

    user.lastFailedLoginDate = now // Always update lastFailedLoginDate

    if (user.firstFailedLoginDate !== null && user.failedLoginAttempts === 5 && (now.getTime() - new Date(user.firstFailedLoginDate).getTime()) < oneHourInMillis) {
      user.status = 'blocked'
      await userRepository.save(user)
      throw new TooManyRequestsError(`User with email: ${email} has been blocked`, 'blocked_user')
    }    
    await userRepository.save(user)
    throw new UnAuthorizedError('Incorrect Password', `password_invalid_${user.failedLoginAttempts}_times`)
  }

  // Successful login, reset failed attempts
  user.failedLoginAttempts = 0
  user.firstFailedLoginDate = null
  user.lastFailedLoginDate = null
  await userRepository.save(user)

  return emitTokens(email, user.id)
}

export const emitTokens = async (email: string, userId: number): Promise<TokensResponse> => {
  const accessToken = jwt.sign({
    email: email,
    id: userId
  },
  JWT_SECRET, { 
    expiresIn: JWT_EXPIRATION 
  })

  const tokenRecord = await refreshTokenRepository.save({ expiresAt: new Date(Date.now() + JWT_REFRESH_TOKEN_EXPIRATION) })
  const { id: tokenRecordId } = tokenRecord
  log(' - tokenRecordId:', tokenRecordId)
  const refreshToken = jwt.sign({ 
    email: email, 
    id: tokenRecordId 
  }, 
  JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_EXPRESSION  
  })

  return { accessToken: accessToken, refreshToken }
}

export default login
