import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
    args:{
        name:v.string(),
        address: v.string(),
        frequency: v.string(),
        enabled:v.boolean()
    },
    handler:async(ctx, args)=> {
        const user = await ctx.auth.getUserIdentity();
        if(!user){
            throw new ConvexError("Unauthorized")
        }
        return await ctx.db.insert("stations",{
            userId:user.subject,
            name:args.name,
            address:args.address,
            frequency:args.frequency,
            enabled:args.enabled
        })
    },
});


export const get = query({
    args:{
        search:v.optional(v.string())
    },
    handler: async (ctx,args)=>{
        const user = await ctx.auth.getUserIdentity();
        if(!user){
            throw new ConvexError("Unauthorized")
            
        }

        if(args.search){
            return await ctx.db.query("stations").withSearchIndex("search_name",(q)=>q.search("name",args.search!))
        }

        const stations = await ctx.db.query("stations").collect();
        return stations
    }
})