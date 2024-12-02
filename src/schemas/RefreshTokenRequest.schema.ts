import { z } from 'zod'

const RefreshTokenRequestSchema = z.object({
  refreshToken: z.string(),
})

export type RefreshTokenRequestType = z.infer<typeof RefreshTokenRequestSchema>

export default RefreshTokenRequestSchema