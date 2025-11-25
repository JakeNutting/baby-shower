import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  rsvps: defineTable({
    _id: v.string(),
    fullName: v.string(),
    isAttending: v.boolean()
  }),

  users: defineTable({
    _id: v.string(),
    email: v.string(),
    password: v.string()
  }),
});
