"use client";

import ViewShowDetails from "@/components/finance/show/view-show-details";
import ReusableLoader from "@/components/shared/reusable-loader";
import { getMediaHouseShows } from "@/lib/shows/shows";
import { AppDispatch, RootState } from "@/lib/store";
import { Clock, Power, Radio, Users } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function MediaHouseShowsList() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.shows.loading);
  const mediaHouseShows = useSelector(
    (state: RootState) => state.shows.mediaHouseShows
  );

  const params = useParams<{ mediaIdd: string }>();

  useEffect(() => {
    dispatch(getMediaHouseShows({ id: params.mediaIdd }));
  }, [dispatch]);
  return (
    <div>
      {loading === "pending" ? (
        <ReusableLoader />
      ) : mediaHouseShows.length === 0 ? (
        <div className="h-24 flex flex-col justify-center items-center text-300">
          <p className="text-gray-400">
            There are no shows in this media house
          </p>
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

                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  {mediaHouseShows.map((show) => (
                    <tr
                      key={show._id}
                      className="hover:bg-gray-600 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-800 rounded-lg">
                            <Radio className="text-blue-400" size={18} />
                          </div>
                          <span className="text-white font-medium">
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
                        <div className="flex items-center justify-center gap-2">
                          {/* view details */}
                          <ViewShowDetails show={show} purpose="view" />
                          <ViewShowDetails show={show} purpose="edit" />
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
        </div>
      )}
    </div>
  );
}

export default MediaHouseShowsList;
