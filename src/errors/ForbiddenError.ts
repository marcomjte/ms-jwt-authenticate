import HttpError from "./HttpError";

export default class ForbiddenError extends HttpError{
  constructor(message: string, code?: string){
    super(403, message, code)
  }
}