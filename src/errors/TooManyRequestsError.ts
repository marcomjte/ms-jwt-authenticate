import HttpError from "./HttpError";

export default class TooManyRequestsError extends HttpError{
  constructor(message: string, code?: string){
    super(429, message, code)
  }
}