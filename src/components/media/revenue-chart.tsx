"use client";

import { mockRevenueData } from "@/utils/utils";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function RevenueChart() {
    return (
        <div className="bg-gray-800/80 rounded-lg shadow-sm p-6 mb-6 mt-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-100">Revenue by Station</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Last 7 Days</button>
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg">Month to Date</button>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Last Month</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="station" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="gross" fill="#3b82f6" name="Gross Revenue" />
                <Bar dataKey="awarded" fill="#ef4444" name="Awarded" />
                <Bar dataKey="net" fill="#10b981" name="Net Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
    )
}

export default RevenueChart
