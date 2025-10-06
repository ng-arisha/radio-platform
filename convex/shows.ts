import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";


export const create = mutation({
    args:{
        stationId:v.id("stations"),
        name:v.string(),
        code:v.string(),
        startTime:v.string(),
        endTime:v.string(),
        jackpotEnabled:v.boolean()
    },
    handler:async(ctx,args)=>{
        const user = await ctx.auth.getUserIdentity();
        if(!user){
            throw new ConvexError("Unauthorized");
        }
        return await ctx.db.insert("shows",{
            stationId:args.stationId,
            name:args.name,
            code:args.code,
            startTime:args.startTime,
            endTime:args.endTime,
            jackpotEnabled:args.jackpotEnabled
        })
    }
})