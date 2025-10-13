import { TrendingDown, TrendingUp } from "lucide-react";
import { Line, LineChart, ResponsiveContainer } from "recharts";

type TrendType = 'up' | 'down' | 'stable';

interface KPICardProps {
    title: string;
    value: number;
    prefix?: string;
    suffix?: string;
    change: number;
    trend: TrendType;
    sparklineData?: number[];
    onClick?: () => void;
  }


function MediaKpiCard({ 
    title, 
    value, 
    prefix = '', 
    suffix = '', 
    change, 
    trend, 
    sparklineData, 
    onClick 
  }: KPICardProps) {
    return (
        <div 
        className="bg-gray-800/70 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer" 
        onClick={onClick}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-gray-100 mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-100">{prefix}{value.toLocaleString()}{suffix}</h3>
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded ${
            trend === 'up' ? 'bg-green-100 text-green-700' : 
            trend === 'down' ? 'bg-red-100 text-red-700' : 
            'bg-gray-100 text-gray-700'
          }`}>
            {trend === 'up' ? <TrendingUp size={16} /> : trend === 'down' ? <TrendingDown size={16} /> : null}
            <span className="text-sm font-medium">{Math.abs(change)}%</span>
          </div>
        </div>
        {sparklineData && (
          <ResponsiveContainer width="100%" height={40}>
            <LineChart data={sparklineData.map((v) => ({ value: v }))}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={trend === 'up' ? '#10b981' : trend === 'down' ? '#ef4444' : '#6b7280'} 
                strokeWidth={2} 
                dot={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    )
}

export default MediaKpiCard
