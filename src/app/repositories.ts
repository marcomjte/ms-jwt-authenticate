import { AppDataSource } from "./data-source";
import User from "../entities/User";
import RefreshToken from "../entities/RefreshToken";
import CodeRenewalPassword from "../entities/code_renewal_password";

export const userRepository = AppDataSource.getRepository(User)
export const refreshTokenRepository = AppDataSource.getRepository(RefreshToken)
export const codeRenewalPasswordRepository = AppDataSource.getRepository(CodeRenewalPassword)