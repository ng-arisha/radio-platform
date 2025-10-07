import { recentWinners } from "@/utils/utils"

function RecentWinners() {
    return (
        <div className={`bg-gray-800/85 rounded-lg shadow-md p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-semibold text-gray-400`}>
              Recent Winners / Transactions
            </h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              View All →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b border-gray-700`}>
                  <th className={`text-left py-3 px-4 font-semibold text-gray-300`}>Prize</th>
                  <th className={`text-left py-3 px-4 font-semibold text-gray-300`}>Reference</th>
                  <th className={`text-left py-3 px-4 font-semibold text-gray-300`}>Station</th>
                  <th className={`text-left py-3 px-4 font-semibold text-gray-300`}>Show</th>
                  <th className={`text-left py-3 px-4 font-semibold text-gray-300`}>Amount</th>
                  <th className={`text-left py-3 px-4 font-semibold text-gray-300`}>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentWinners.map((winner) => (
                  <tr key={winner.id} className={`border-b border-gray-700 hover:bg-gray-750 transition-colors`}>
                    <td className={`py-4 px-4 text-gray-300`}>{winner.prize}</td>
                    <td className={`py-4 px-4 text-gray-300 font-mono text-sm`}>{winner.reference}</td>
                    <td className={`py-4 px-4 text-gray-300`}>{winner.station}</td>
                    <td className={`py-4 px-4 text-gray-300`}>{winner.show}</td>
                    <td className={`py-4 px-4 text-gray-300 font-medium`}>${winner.amount.toLocaleString()}</td>
                    <td className={`py-4 px-4 text-gray-300 text-sm`}>{winner.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    )
}

export default RecentWinners
