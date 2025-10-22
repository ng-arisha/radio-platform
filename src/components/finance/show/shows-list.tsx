"use client";

import { getShowInStation } from "@/lib/shows/shows";
import { AppDispatch, RootState } from "@/lib/store";
import { formatCurrency } from "@/utils/utils";
import {
    Clock,
    DollarSign,
    Edit,
    Eye,
    Power,
    Radio,
    SunIcon,
    Users,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ShowList() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.shows.loading);
  const shows = useSelector((state: RootState) => state.shows.stationShows);
  const params = useParams<{ stationId: string }>();

  useEffect(() => {
    dispatch(getShowInStation({ id: params.stationId }));
  }, [dispatch, params.stationId]);
  return (
    <div>
      {loading === "pending" ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <SunIcon className="animate-spin mb-2" size={24} />
          <p>Loading shows...</p>
        </div>
      ) : shows.length === 0 ? (
        <div className="h-24 flex flex-col justify-center items-center text-red-600">
          <p>There are no shows to display.</p>
        </div>
      ) : (
        <div>
          {/* basics */}

          <div className="bg-gray-700 rounded-xl border border-gray-600 shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800 border-b border-gray-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Show Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Code
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Time Slot
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Presenters
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Revenue
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  {shows.map((show) => (
                    <tr
                      key={show._id}
                      className="hover:bg-gray-600 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-800 rounded-lg">
                            <Radio className="text-blue-400" size={18} />
                          </div>
                          <span className="text-white font-semibold">
                            {show.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300 font-mono text-sm">
                          {show.code}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Clock size={16} />
                          <span className="text-sm">
                            {show.startTime} - {show.endTime}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                            show.status === "Active"
                              ? "bg-green-900 text-green-300"
                              : "bg-gray-600 text-gray-300"
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${
                              show.status === "Active"
                                ? "bg-green-400"
                                : "bg-gray-400"
                            }`}
                          ></div>
                          {show.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Users className="text-gray-400" size={16} />
                          <span className="text-gray-300 text-sm">
                            {show.users.length}{" "}
                            {show.users.length === 1
                              ? "presenter"
                              : "presenters"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="text-green-400" size={16} />
                          <span className="text-green-400 font-bold">
                            {formatCurrency(show.dailyRevenue || 0)}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="p-2 text-blue-400 hover:bg-blue-900 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            className="p-2 text-yellow-400 hover:bg-yellow-900 rounded-lg transition-colors"
                            title="Edit Show"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            className={`p-2 rounded-lg transition-colors ${
                              show.status === "Active"
                                ? "text-red-400 hover:bg-red-900"
                                : "text-green-400 hover:bg-green-900"
                            }`}
                            title={
                              show.status === "Active"
                                ? "Disable Show"
                                : "Enable Show"
                            }
                          >
                            <Power size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats Footer */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <p className="text-gray-400 text-sm mb-1">Total Shows</p>
              <p className="text-white text-2xl font-bold">{shows.length}</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <p className="text-gray-400 text-sm mb-1">Active Shows</p>
              <p className="text-green-400 text-2xl font-bold">
                {shows.filter((s) => s.status === "Active").length}
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
              <p className="text-blue-400 text-2xl font-bold">
                TZs{" "}
                {shows
                  .reduce((sum, show) => sum + show.dailyRevenue!, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <p className="text-gray-400 text-sm mb-1">Avg Revenue/Show</p>
              <p className="text-purple-400 text-2xl font-bold">
                TZs{" "}
                {Math.round(
                  shows.reduce((sum, show) => sum + show.dailyRevenue!, 0) /
                    shows.length
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowList;
