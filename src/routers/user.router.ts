import { Router } from "express";
import validationsEnforceMiddleware from "../middlewares/validations-enforce.middleware";
import CheckEmailExistenceSchema from "../schemas/CheckEmailExistence.schema";
import checkEmailExistenceHandler from "../handlers/user/check-email-existence.handler";

const userRouter = Router()

userRouter.post('/check-email-existence', validationsEnforceMiddleware(CheckEmailExistenceSchema), checkEmailExistenceHandler)

export default userRouter