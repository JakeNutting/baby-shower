import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, mutation, query } from "./_generated/server";


export const submitRsvp = mutation({
  args: {
    fullName: v.string(),
    isAttending: v.boolean()
  },
  async handler(ctx, args) {
    if (!args.fullName || args.isAttending === undefined) {
      throw new ConvexError("You must be logged in to create an account");
    }

    await ctx.db.insert("rsvps", {
      fullName: args.fullName,
      isAttending: args.isAttending,
    });
  },
});

export const checkLogin = mutation({
  args: {
    email: v.string(),
    password: v.string()
  },
  async handler(ctx, { email, password }) {
    // 1. Query the user by email using the index
    const users = await ctx.db.query("users").collect();

    const user = users.find(u => u.email === email);

    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }

    if (password !== user.password) {
      return { success: false, message: "Invalid email or password" };
    }

    // 3. Success
    return { success: true, message: "Login successful", userId: user._id };
  }
});

