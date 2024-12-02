import HttpError from "./HttpError";

export default class InternalServerError extends HttpError{
  constructor(message: string){
  super(500,message)
  }
}