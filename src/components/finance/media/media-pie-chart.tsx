import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
interface AllocationData {
    name: string;
    value: number;
    percentage: string;
}
function MediaPieChart({allocationDistribution}: {allocationDistribution: AllocationData[]}) {
    const colors = ['#2563eb', '#7c3aed', '#db2777', '#ea580c', '#16a34a'];
    return (
        <div className="bg-gray-900/90 rounded-lg shadow-lg p-6 border border-gray-600">
        <h2 className="text-lg font-bold text-white mb-6">Allocation Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={allocationDistribution as unknown as Record<string,string|number>[]} cx="50%" cy="50%" labelLine={false} label={({ name, percentage }) => `${name} ${percentage}%`} outerRadius={80} fill="#8884d8" dataKey="value">
              {allocationDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value:number) => `TZs ${(value / 1000000).toFixed(2)}M`} contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
}

export default MediaPieChart
