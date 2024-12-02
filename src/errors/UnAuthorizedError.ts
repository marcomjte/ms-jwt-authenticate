import HttpError from "./HttpError";

export default class UnAuthorizedError extends HttpError{
  constructor(message: string, code?: string){
    super(401, message, code)
  }
}