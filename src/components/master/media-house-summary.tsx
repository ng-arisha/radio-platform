import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

interface MediaHouseSummaryProps {
  name: string;
  revenue: number;
  totalStations: number;
  totalShows: number;
}

function MediaHouseSummary({ data }: { data: MediaHouseSummaryProps[] }) {
  return (
    <div className="mt-4">
      <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
        <h3 className="text-lg font-semibold text-white mb-4">
          Media House Summary
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#374151",
                border: "none",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="totalStations" fill="#EA580C" />
            <Bar dataKey="totalShows" fill="#9333EA" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MediaHouseSummary;
