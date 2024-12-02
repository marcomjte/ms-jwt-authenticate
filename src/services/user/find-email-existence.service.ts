import { log } from "console"
import { userRepository } from "../../app/repositories"
import NotFoundError from "../../errors/NotFoundError"

interface ExistingEmailVO {  
  status: string
  hasPassword: boolean
  canSetPassword: boolean
}

const findEmailExistence = async (email: string): Promise<ExistingEmailVO> => {
  log('Starting FindEmailExistence service...')
  log(' - email: ', email)
  const user = await userRepository.findOneBy({ email })
  if (!user) {
    throw new NotFoundError(`No record of email ${email} found in the database`)
  }
  
  log(' - user : ', user)
  let hasPassword: boolean
  let canSetPassword: boolean
  
  if (user && user.password) {
    hasPassword = true
    canSetPassword = false
  } else {
    hasPassword = false
    canSetPassword = true
  }
  
  const response: ExistingEmailVO = {
    status: user.status,
    hasPassword: hasPassword,
    canSetPassword: canSetPassword    
  }
  
  log(' - response : ', response)
  return response
}

export default findEmailExistence
