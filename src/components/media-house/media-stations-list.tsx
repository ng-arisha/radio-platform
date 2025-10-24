import { formatCurrency } from "@/utils/utils";
import { Edit2, Eye, Power } from "lucide-react";

function MediaStationsList({
  stationData,
}: {
  stationData: StationUmmaryType[];
}) {
  return (
    <div>
      <div className="bg-gray-700 rounded-lg overflow-hidden border border-gray-600">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-750 border-b border-gray-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Station Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Frequency
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Admin
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Total Revenue
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Budget
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {stationData.map((station) => (
                <tr key={station.id} className="hover:bg-gray-650">
                  <td className="px-6 py-4 font-medium">{station.name}</td>
                  <td className="px-6 py-4 text-blue-400">
                    {station.frequency}
                  </td>
                  <td className="px-6 py-4">{station.admin}</td>
                  <td className="px-6 py-4 text-green-400">
                    {formatCurrency(station.revenue)}
                  </td>
                  <td className="px-6 py-4">
                    {formatCurrency(station.budget)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        station.status === "active"
                          ? "bg-green-900 text-green-300"
                          : "bg-red-900 text-red-300"
                      }`}
                    >
                      {station.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        className="p-2 hover:bg-gray-600 rounded transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="p-2 hover:bg-gray-600 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        className="p-2 hover:bg-gray-600 rounded transition-colors"
                        title={
                          station.status === "active" ? "Disable" : "Activate"
                        }
                      >
                        <Power
                          size={18}
                          className={
                            station.status === "active"
                              ? "text-green-400"
                              : "text-red-400"
                          }
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MediaStationsList;
