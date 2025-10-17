import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
interface UtilizationData {
    name: string;
    allocated: number;
    utilized: number;
    percentage: string;
}
function AllocationVsUtilizationStations({utilizationData}: {utilizationData: UtilizationData[]}) {
    return (
        <div className="bg-gray-900/90 rounded-lg shadow-lg p-6 border border-gray-600">
            <h2 className="text-lg font-bold text-white mb-6">Utilization Rate by Station</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={utilizationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip formatter={(value:number) => `KES ${(value / 1000000).toFixed(2)}M`} contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }} />
                <Legend wrapperStyle={{ color: '#9ca3af' }} />
                <Bar dataKey="allocated" fill="#7c3aed" name="Allocated" />
                <Bar dataKey="utilized" fill="#db2777" name="Utilized" />
              </BarChart>
            </ResponsiveContainer>
          </div>
    )
}

export default AllocationVsUtilizationStations
