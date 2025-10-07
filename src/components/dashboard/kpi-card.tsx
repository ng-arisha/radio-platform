import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react"

function KPICard({ title, value, percentage, isPositive, Icon, subtitle }:{ title: string, value: number, percentage?: number, isPositive?: boolean, Icon: LucideIcon, subtitle?: string }) {
    return (
        <div className={`bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:scale-105`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`p-3 rounded-lg bg-gray-800`}>
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        {percentage !== undefined && (
          <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            <span className="text-sm font-semibold">{percentage}%</span>
          </div>
        )}
      </div>
      <h3 className={`text-sm font-medium text-gray-600 mb-1`}>{title}</h3>
      <p className={`text-2xl font-bold text-gray-600`}>
        TZS.{value.toLocaleString()}
      </p>
      {subtitle && (
        <p className={`text-xs text-gray-500 mt-2`}>{subtitle}</p>
      )}
    </div>
    )
}

export default KPICard
