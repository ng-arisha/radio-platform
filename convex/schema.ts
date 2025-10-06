import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    stations:defineTable({
        userId:v.string(),
        name:v.string(),
        address:v.string(),
        frequency:v.string(),
        enabled:v.boolean()
    }).searchIndex("search_name",{
        searchField:"name"
    }),

    shows:defineTable({
        stationId:v.id("stations"),
        name:v.string(),
        code:v.string(),
        startTime:v.string(),
        endTime:v.string(),
        jackpotEnabled:v.boolean()
    })

})


