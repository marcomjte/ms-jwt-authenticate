import { log } from "console"
import { RequestHandler } from "express"
import expressAsyncHandler from "express-async-handler"
import { RefreshTokenBodyType } from "../../schemas/RefreshTokenBody.schema"
import logout from "../../services/authentication/logout.service";

const logoutHandler: RequestHandler = async (req, res) => {
  log('Starting logoutHandler...')
  const { refreshToken } = req.body as RefreshTokenBodyType
  log(' - refreshToken:', refreshToken)

  await logout(refreshToken)

  res.status(204).send()
};

export default expressAsyncHandler(logoutHandler)