import { mockRevenueData } from "@/utils/utils"
import { Download } from "lucide-react"

function RevenueTable() {
    return (
        <div className="bg-gray-800/90 rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-300">Revenue & Commission Summary</h3>
              <button className="px-4 py-2 border border-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-800/90 text-sm">
                <Download size={16} />
                Export CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/90">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Station</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase">Gross Revenue</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase">Total Awarded</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase">Net Revenue</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase">Presenter Comm.</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase">Media House Comm.</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase">Platform Comm.</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase">Shows</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockRevenueData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-300">{row.station}</td>
                      <td className="px-4 py-4 text-sm text-right font-semibold text-gray-300">TZs {row.gross.toLocaleString()}</td>
                      <td className="px-4 py-4 text-sm text-right text-red-600">-TZs {row.awarded.toLocaleString()}</td>
                      <td className="px-4 py-4 text-sm text-right font-semibold text-green-600">TZs {row.net.toLocaleString()}</td>
                      <td className="px-4 py-4 text-sm text-right text-gray-300">TZs {row.presenter.toLocaleString()}</td>
                      <td className="px-4 py-4 text-sm text-right font-medium text-blue-600">TZs {row.mediaHouse.toLocaleString()}</td>
                      <td className="px-4 py-4 text-sm text-right text-gray-300">TZs {row.platform.toLocaleString()}</td>
                      <td className="px-4 py-4 text-sm text-center text-gray-300">{row.shows}</td>
                      <td className="px-4 py-4 text-center">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Station</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
    )
}

export default RevenueTable
