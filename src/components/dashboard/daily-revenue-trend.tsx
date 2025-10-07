"use client"

import { dailyRevenueData } from "@/utils/utils"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

function DailyRevenueTrend() {
    return (
        <div className={`bg-gray-800/85 rounded-lg shadow-md p-6`}>
        <h2 className={`text-lg font-semibold text-gray-500 mb-4`}>
          Daily Revenue Trend
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyRevenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke={'#374151'} />
            <XAxis dataKey="date" stroke={'#9ca3af'} />
            <YAxis stroke={'#9ca3af'} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              labelStyle={{ color: '#f9fafb' }}
            />
            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
}

export default DailyRevenueTrend
