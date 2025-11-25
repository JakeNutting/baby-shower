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