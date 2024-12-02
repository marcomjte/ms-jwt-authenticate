import HttpError from "./HttpError"

export default class NoContent extends HttpError {
  constructor(message: string) {
    super(204, message)
  }  
}