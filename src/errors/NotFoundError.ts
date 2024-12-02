import HttpError from "./HttpError"

export default class NotFoundError extends HttpError {
  constructor(message: string, code?: string) {
    super(404, message, code)
  }  
}