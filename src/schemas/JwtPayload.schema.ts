import { z } from "zod";

const JwtPayloadSchema = z.object({
  email: z.string().email(),
  id: z.number(),
  iat: z.number(),
  exp: z.number(),
});

export type JwtPayloadType = z.infer<typeof JwtPayloadSchema>;

export default JwtPayloadSchema;