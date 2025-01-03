import express, {} from "express"
import cors from 'cors'
import errorHandler from "../middlewares/error-handler.middleware"
import authenticationRouter from "../routers/authentication.router"
import userRouter from "../routers/user.router"

const setupExpressApp = () => {
  const app = express()

  app.use(cors({
    exposedHeaders: ['*', 'X-Total-Pages']
  }))
  app.use(express.json())

  app.use('/auth', authenticationRouter)
  app.use('/user', userRouter)
    
  app.use(errorHandler)
  
  let { PORT: port } = process.env
  port = port || '3000'
  app.listen(+port, () => {
    console.log(' Server is listen on port: ', port)
  })
}

export default setupExpressApp