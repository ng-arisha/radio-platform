import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    stations:defineTable({
        userId:v.string(),
        name:v.string(),
        address:v.string(),
        frequency:v.string(),
        enabled:v.boolean()
    })
})