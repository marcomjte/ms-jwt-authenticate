import { DataSource } from 'typeorm'

const {
  DB_HOST: host,
  DB_PASS: password,
  DB_USER: username,
  DB_PORT: port,
  DB_NAME: database
} = process.env

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