"use client";

import { getStationFinancialShowData } from "@/lib/finance/finance";
import { AppDispatch, RootState } from "@/lib/store";
import { formatCurrency, formatDate } from "@/utils/utils";
import { SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllocateFundsModal from "../finance/allocate-funds";

function ShowFinancialAllocations() {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ stationId: string }>();
  const loading = useSelector(
    (state: RootState) => state.finance.loadingShowData
  );
  const pieData = useSelector(
    (state: RootState) => state.finance.stationFinancialsShowData
  );

  useEffect(() => {
    dispatch(getStationFinancialShowData({ id: params.stationId }));
  }, [dispatch, params.stationId]);
  return (
    <div className="mt-4">
      {loading === "pending" ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <SunIcon className="animate-spin mb-2" size={24} />
          <p>Loading data...</p>
        </div>
      ) : (
        <div>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">
                Budget Allocation
              </h2>
              <AllocateFundsModal />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left text-gray-400 font-medium py-3 px-4">
                      Show
                    </th>
                    <th className="text-left text-gray-400 font-medium py-3 px-4">
                      Allocated
                    </th>
                    <th className="text-left text-gray-400 font-medium py-3 px-4">
                      Utilized
                    </th>
                    <th className="text-left text-gray-400 font-medium py-3 px-4">
                      Remaining
                    </th>
                    <th className="text-left text-gray-400 font-medium py-3 px-4">
                      Last Updated
                    </th>
                    <th className="text-left text-gray-400 font-medium py-3 px-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pieData.map((row, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-800 hover:bg-gray-800 transition-colors"
                    >
                      <td className="py-3 px-4 text-white font-medium">
                        {row.show.name}
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {formatCurrency(row.allocated)}
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {formatCurrency(row.utilized)}
                      </td>
                      <td className="py-3 px-4 text-green-400">
                        ${formatCurrency(row.allocated - row.utilized)}
                      </td>
                      <td className="py-3 px-4 text-gray-400">
                        {formatDate(row.createdAt)}
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                          Edit
                        </button>
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

export default ShowFinancialAllocations;
