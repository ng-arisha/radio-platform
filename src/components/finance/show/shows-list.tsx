"use client";

import Input from "@/components/shared/input";
import Select from "@/components/shared/reusable-select-input";
import { getShowInStation } from "@/lib/shows/shows";
import { AppDispatch, RootState } from "@/lib/store";
import { formatCurrency, timeFilters, UserRole } from "@/utils/utils";
import { Clock, DollarSign, Eye, Filter, Radio, Search, SunIcon, Users } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteShowModal from "./delete-show-modal";
import NewShow from "./new-show";
import ViewShowDetails from "./view-show-details";

function ShowList() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.shows.loading);
  const shows = useSelector((state: RootState) => state.shows.stationShows);
  const params = useParams<{ stationId: string }>();
  const [filterStatus, setFilterStatus] = useState<
      "all" | "active" | "inactive"
    >("all");
    const [query, setQuery] = useState("");
    const [activeRange, setActiveRange] = useState(timeFilters[2].value);

    const fetchShowsInStation = async (search:string,status:string,range:string) => {
      await dispatch(getShowInStation({ id: params.stationId, search, status, range }));
    }

  useEffect(() => {
    fetchShowsInStation(query,filterStatus,activeRange);
  }, [dispatch, params.stationId, query, filterStatus, activeRange]);
  return (
    <div>
      <div className="bg-gray-700 rounded-xl p-6 border border-gray-600 shadow-lg mb-6">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              {/* Search */}
              <div className="flex-1 min-w-[300px] relative">
                <Input
                  value={query}
                  onChange={setQuery}
                  placeholder="Search shows by name or code..."
                  type="text"
                  Icon={Search}
                />
              </div>

              {/* Filters */}
              <div className="flex gap-3">
                <Select 
                value={activeRange}
                onChange={setActiveRange}
                options={timeFilters}
                Icon={Filter}
                />
                <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1 border border-gray-600">
                  <button
                    onClick={() => setFilterStatus("all")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      filterStatus === "all"
                        ? "bg-blue-600 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    All Shows
                  </button>
                  <button
                    onClick={() => setFilterStatus("active")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      filterStatus === "active"
                        ? "bg-green-600 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setFilterStatus("inactive")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      filterStatus === "inactive"
                        ? "bg-gray-600 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Inactive
                  </button>
                </div>

                <NewShow role={UserRole.STATION_ADMIN} />
              </div>
            </div>
          </div>
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
                      Active days
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
                          {show.activeDays.join(", ")}
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
                            {show.users? show.users.length: show.team.length}{" "}
                            {show.users?.length === 1
                              ? "presenter"
                              : "presenters"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="text-green-400" size={16} />
                          <span className="text-green-400 font-bold">
                            {formatCurrency(show.revenue || 0)}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {/* view details */}
                          {/* <ViewShowDetails show={show} purpose="view" /> */}
                          <Link
                            href={`/shows/${show._id}/dashboard`}
                            type="button"
                            className="p-2 text-yellow-400 hover:bg-yellow-900 rounded-lg transition-colors"
                            title="Edit Show"
                          >
                            <Eye size={18} />
                          </Link>
                          <ViewShowDetails show={show} purpose="edit" />
                          <DeleteShowModal show={show} />
                          {/* <button
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
                          </button> */}
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
                  .reduce((sum, show) => sum + show.revenue!, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <p className="text-gray-400 text-sm mb-1">Avg Revenue/Show</p>
              <p className="text-purple-400 text-2xl font-bold">
                TZs{" "}
                {Math.round(
                  shows.reduce((sum, show) => sum + show.revenue!, 0) /
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
