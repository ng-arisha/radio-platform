"use client";

import { revenueData } from "@/utils/utils";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function RevenueChart() {
    return (
        <div className="lg:col-span-2 bg-gray-900 rounded-lg p-6 border border-gray-700 mt-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorGross" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} />
              <Legend />
              <Area type="monotone" dataKey="gross" stroke="#3b82f6" fillOpacity={1} fill="url(#colorGross)" name="Gross Revenue (K)" />
              <Area type="monotone" dataKey="net" stroke="#10b981" fillOpacity={1} fill="url(#colorNet)" name="Net Revenue (K)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
    )
}

export default RevenueChart
