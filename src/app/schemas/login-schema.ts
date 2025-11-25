import { z } from "zod"
 
export const loginSchema = z.object({
    email: z.string().min(1, {
        message: "Email must be at least 1 character",
      }).max(25),
    password: z.string().min(1, {
        message: "Password must be at least 1 character",
      }).max(25),
})