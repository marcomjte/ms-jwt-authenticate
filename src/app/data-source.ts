import { DataSource } from 'typeorm'
import { log } from 'console'

const {
  DB_HOST: host,
  DB_PASS: password,
  DB_USER: username,
  DB_PORT: port,
  DB_NAME: database
} = process.env

log(' - data source')
log(' - host', host)
log(' - password', password)
log(' - username', username)
log(' - port', port)
log(' - database', database)

export const AppDataSource = new DataSource({
  type: 'mysql',
  host,
  port: port ? +port: undefined,
  username,
  password,
  database,
  synchronize: false,
  logging: false,
  entities: ["src/entities/**/*.ts"]
})