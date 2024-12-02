import axios from "axios"
import { log } from "console"


interface UserDTO {
    id: number,
    name: string,
    boss: {
    id: number,
    name: string
  },
  avatar: {
    id: number,
    widths: number[],
    basePath: string,
    extension: string,
    ratio: string,
    name: string
  },
  permissions: string[]
}

const { MICROSERVICE_USERS_URL: host } = process.env

const getUserPermissions = async (userId: number): Promise<string[]> => {

  const headers = {
    'X-User-Id': userId,
  }
  const permissions = await axios.get<UserDTO>(`${host}/me`, { headers })

  log(' - permissions', permissions.data.permissions)
  return permissions.data.permissions

}

export default getUserPermissions