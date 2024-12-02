import { log } from "console";
import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import { RefreshTokenRequestType } from "../../schemas/RefreshTokenRequest.schema";
import refreshToken from "../../services/authentication/refresh-token.service";

const refreshTokenHandler: RequestHandler = async (req, res) => {
  log('Starting refreshTokenHandler...')
  const { body }: { body: RefreshTokenRequestType } = req 
  const { refreshToken : token } = body

  const tokens = await refreshToken(token)
  res.send(tokens)
}

export default expressAsyncHandler(refreshTokenHandler);