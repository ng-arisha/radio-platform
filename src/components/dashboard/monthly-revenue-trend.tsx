"use client"

import { monthlyRevenueData } from "@/utils/utils"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

function MonthlyRevenueTrend() {
    return (
        <div className={`bg-gray-800/85 rounded-lg shadow-md p-6`}>
            <h2 className={`text-lg font-semibold text-gray-500 mb-4`}>
              Monthly Revenue Overview
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke={'#374151'} />
                <XAxis dataKey="month" stroke={'#9ca3af'} />
                <YAxis stroke={'#9ca3af'} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                  labelStyle={{ color: '#f9fafb'}}
                />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
       
    )
}

export default MonthlyRevenueTrend
