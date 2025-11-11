import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  rsvps: defineTable({
    _id: v.string(),
    firstName: v.string(),
    lastName: v.string()
  }),

  users: defineTable({
    _id: v.string(),
    email: v.string(),
    password: v.string()
  }),
});
