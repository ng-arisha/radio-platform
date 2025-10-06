import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    name: v.string(),
    address: v.string(),
    frequency: v.string(),
    enabled: v.boolean(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }
    return await ctx.db.insert("stations", {
      userId: user.subject,
      name: args.name,
      address: args.address,
      frequency: args.frequency,
      enabled: args.enabled,
    });
  },
});

export const get = query({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const stations = await ctx.db.query("stations").collect();
    return stations;
  },
});


export const updateById = mutation({
  args:{id:v.id("stations"),name:v.string(),address:v.string(),frequency:v.string(),enabled:v.boolean()},
  handler:async(ctx,args)=>{
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }
    const station = await ctx.db.get(args.id);
    if(!station){
      throw new ConvexError("Station not found");
    }
    
    await ctx.db.patch(args.id,{
      name:args.name,
      address:args.address,
      frequency:args.frequency,
      enabled:args.enabled
    })
    return true;
  }
})

export const getById = query({
  args:{id:v.id("stations")},
  handler:async(ctx,args)=>{
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }
    const station = await ctx.db.get(args.id);
    if(!station){
      throw new ConvexError("Station not found");
    }
    return station;
  }
})