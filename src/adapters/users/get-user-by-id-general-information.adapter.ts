import axios from "axios"
import { log } from "console"

const { MICROSERVICE_USERS_URL: usersUrl } = process.env

log(' - usersUrl', usersUrl)

interface UserMapingInfoGeneralDTO {
  id: number
  name: string
}

const getUserByIdGeneralInformation = async (userId: number): Promise<UserMapingInfoGeneralDTO> => {
  log('Running getUserById')
  const response = await axios.get<UserMapingInfoGeneralDTO>(`${usersUrl}/users/${userId}/mapping/general-information`)
  return response.data
}

export default getUserByIdGeneralInformation