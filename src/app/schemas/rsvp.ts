import { z } from "zod"
 
export const rsvpSchema = z.object({
    fullName: z.string().min(1, {
        message: "Name must be at least 1 character",
      }).max(255),
    isAttending: z.boolean()
})