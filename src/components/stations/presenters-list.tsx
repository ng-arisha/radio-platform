"use client";

import { getStationPresenters } from "@/lib/stations/stations";
import { AppDispatch, RootState } from "@/lib/store";
import { Radio, SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AssignPresentersPaymentrates from "./assign-presenters-rate";

function PresentersList() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.stations.loading);
  const presenters = useSelector(
    (state: RootState) => state.stations.stationPresenters
  );
  const params = useParams<{ stationId: string }>();

  useEffect(() => {
    dispatch(getStationPresenters({ id: params.stationId }));
  }, [dispatch, params.stationId]);
  return (
    <div>
      {loading === "pending" ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <SunIcon className="animate-spin mb-2" size={24} />
          <p>Loading presenters...</p>
        </div>
      ) : presenters.length === 0 ? (
        <div className="h-24 flex flex-col justify-center items-center text-red-600">
          <p>There are no presenters to display.</p>
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
                      Show
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Rate
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  {presenters.map((presenter, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-600 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-800 rounded-lg">
                            <Radio className="text-blue-400" size={18} />
                          </div>
                          <span className="text-white font-semibold">
                            {presenter.showName || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300 font-mono text-sm">
                          {presenter.user.fullName}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300 font-mono text-sm">
                          {presenter.user.email}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300 font-mono text-sm">
                          {presenter.user.phoneNumber || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300 font-mono text-sm">
                          {presenter.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300 font-mono text-sm">
                          {presenter.commissionRate}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-300">
                          <span className="text-sm">
                            {new Date(
                              presenter.user.createdAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <AssignPresentersPaymentrates user={presenter} />
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

export default PresentersList;
