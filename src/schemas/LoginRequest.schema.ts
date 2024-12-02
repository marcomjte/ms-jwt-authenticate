import { z } from "zod";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

const LoginRequestSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be no more than 20 characters long")
    .regex(passwordRegex, "Password must contain at least one uppercase letter, one number, and one symbol")
});

export type LoginRequestType = z.infer<typeof LoginRequestSchema>;

export default LoginRequestSchema;