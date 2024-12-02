import { log } from "console"
import { RequestHandler } from "express"
import expressAsyncHandler from "express-async-handler"
import { LoginRequestType } from "../../schemas/LoginRequest.schema"
import login from "../../services/authentication/login.service"

const loginHandler: RequestHandler = async (req, res) => {
  log('Starting loginHandler...')
  const { email, password } = req.body as LoginRequestType
  log(' - email:', email)
  log(' - password:', password)

  const tokens = await login(email, password)

  res.json(tokens)
}

export default expressAsyncHandler(loginHandler)