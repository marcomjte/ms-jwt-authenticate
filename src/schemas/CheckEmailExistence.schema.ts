import { z } from "zod";

const CheckEmailExistenceSchema = z.object({
  email: z.string().email("Invalid email address")  
})

export type CheckEmailExistenceSchemaType = z.infer<typeof CheckEmailExistenceSchema>;

export default CheckEmailExistenceSchema;