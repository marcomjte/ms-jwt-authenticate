import { log } from "console"
import { RequestHandler } from "express"
import expressAsyncHandler from "express-async-handler"
import { CheckEmailExistenceSchemaType } from "../../schemas/CheckEmailExistence.schema"
import findEmailExistence from "../../services/user/find-email-existence.service"

const checkEmailExistenceHandler: RequestHandler = async (req, res) => {
  log('Starting checkEmailExistenceHandler...')
  const { email } = req.body as CheckEmailExistenceSchemaType
  log(' - email: ', email)
  
  const emailExistenceResponse = await findEmailExistence(email)
  res.status(200).json(emailExistenceResponse)
}

export default expressAsyncHandler(checkEmailExistenceHandler)