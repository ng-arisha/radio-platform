import { masterKpiData } from "@/utils/utils"
import { TrendingDown, TrendingUp } from "lucide-react"


function MasterDashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {masterKpiData.map((kpi, idx) => (
          <div key={idx} className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition">
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg `}>
                <kpi.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-sm ${kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {kpi.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {Math.abs(kpi.change)}%
              </div>
            </div>
            <div className="text-2xl font-bold mb-1">{kpi.value}</div>
            <div className="text-sm text-gray-400">{kpi.label}</div>
          </div>
        ))}
        </div>
    )
}

export default MasterDashboard
