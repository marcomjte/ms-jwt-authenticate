
export default class HttpError extends Error{
  type: number
  message: string
  code: string = 'UNKNOWN_ERROR'

  constructor(type: number, message: string, code?: string){
    super(message)
    this.type = type
    this.message = message
    if (code) this.code = code
  }
}