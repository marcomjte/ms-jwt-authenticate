import z from 'zod'

const RefreshTokenBodySchema = z.object({
  refreshToken: z.string()
})

export type RefreshTokenBodyType = z.infer<typeof RefreshTokenBodySchema>

export default RefreshTokenBodySchema