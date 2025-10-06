import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";


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

export const get = query({
    handler:async(ctx)=>{
        const user = await ctx.auth.getUserIdentity();
        if(!user){
            throw new ConvexError("Unauthorized");
        }

        const shows = await ctx.db.query("shows").collect();
        return shows;
    }
})

export const getByStationId = query({
    args:{stationId:v.id("stations")},
    handler:async(ctx,args)=>{
        const user = await ctx.auth.getUserIdentity();
        if(!user){
            throw new ConvexError("Unauthorized");
        }

        const shows = await ctx.db.query("shows").filter(q=>q.eq(q.field("stationId"),args.stationId)).collect();
        return shows;
    }
})