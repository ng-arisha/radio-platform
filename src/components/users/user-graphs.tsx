import { transformToNameValueArray } from "@/utils/utils";
import { Area, AreaChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface TooltipProps {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
      color: string;
      payload: {date:string,mediaHouse:number,stationAdmins:number,presenters:number};
    }>;
  }

const CustomTooltip:React.FC<TooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{payload[0].payload.date}</p>
          {payload.map((entry, index:number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };


function UserGraphs({distributionData}: {distributionData: { mediaHouse: number; stationAdmin: number; presenter: number;customerCare:number; financeOfficer: number }[]}) {
  console.log('distributionData', distributionData);
  const modifiedDistributionData = transformToNameValueArray(distributionData)

  console.log('modifiedDistributionData', modifiedDistributionData);

    return (
        <div className="grid grid-1 md:grid-cols-2 gap-4">
            {/* pie chart */}
            <div className="bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-600">
          <h2 className="text-lg font-bold text-gray-100 mb-4">User Distribution</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={modifiedDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {modifiedDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              {/* <Tooltip content={<PieTooltip />} /> */}
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {modifiedDistributionData.map((item, index) => {
              const total = modifiedDistributionData.reduce((sum, i) => sum + i.value, 0);
              const percentage = ((item.value / total) * 100).toFixed(1);
              return (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-100">{item.name}</span>
                  </div>
                  <span className="font-semibold text-gray-200">{percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* user growth over time */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 ">
          <h2 className="text-lg font-bold text-white mb-4">Player Growth Over Time</h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={distributionData}>
              <defs>
                <linearGradient id="colorMedia" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorStation" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPresenters" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Area 
                type="monotone" 
                dataKey="presenters" 
                stroke="#10b981" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorPresenters)" 
                name="Presenters"
              />
              <Area 
                type="monotone" 
                dataKey="stationAdmins" 
                stroke="#3b82f6" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorStation)" 
                name="Station Admins"
              />
              <Area 
                type="monotone" 
                dataKey="mediaHouse" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorMedia)" 
                name="Media House Admins"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
        
    )
}

export default UserGraphs
