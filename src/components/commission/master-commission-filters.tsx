"use client";

import { getSMasterPlatformCommission } from "@/lib/commission/commission";
import { AppDispatch, RootState } from "@/lib/store";
import { formatCurrency } from "@/utils/utils";
import { Percent } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MasterSetCommissionRate from "../finance/show/commission/master-set-commission-rate";
import ReusableLoader from "../shared/reusable-loader";

function MasterCommissionFilters() {
  const range = [
    {
      label: "1 hr Ago",
      value: "1h",
    },
    {
      label: "6 hrs Ago",
      value: "6h",
    },
    {
      label: "1 day Ago",
      value: "1d",
    },
    {
      label: "This Week",
      value: "1w",
    },
    {
      label: "This Month",
      value: "1m",
    },
  ];

  const [activeRange, setActiveRange] = useState("1d");

  const dispatch = useDispatch<AppDispatch>();

  const loading = useSelector((state: RootState) => state.commission.loading);
  const masterCommission = useSelector(
    (state: RootState) => state.commission.masterCommission
  );

  const fetchMasterCommission = async (range: string) => {
    await dispatch(getSMasterPlatformCommission({ range }));
  };

  useEffect(() => {
    fetchMasterCommission(activeRange);
  }, [activeRange]);

  return (
    <div>
      <div className="bg-gray-700 rounded-xl p-6 border border-gray-600 shadow-lg mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Search */}

          {/* Filters */}
          <div className="flex gap-3">
            <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1 border border-gray-600">
              {range.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setActiveRange(item.value)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    activeRange === item.value
                      ? "bg-orange-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {loading === "pending" || masterCommission === null ? (
        <ReusableLoader />
      ) : (
        <div>
          <h1 className="text-lg font-medium pb-2">Total Summary</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-2">
            {/*total revenue */}
            <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
              <p className="text-gray-400 text-sm mb-2">Total Revenue</p>
              <p className="text-3xl font-bold text-white">
                {formatCurrency(masterCommission.platformTotalRevenue)}
              </p>
            </div>

            {/* total commission */}
            <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
              <p className="text-gray-400 text-sm mb-2">Total Commission</p>
              <p className="text-3xl font-bold text-white">
                {formatCurrency(masterCommission.platformTotalCommission)}
              </p>
            </div>
          </div>
          <h1 className="text-lg font-medium pb-2">Individual Contributions</h1>

          {
            masterCommission.mediaHouses.length === 0 ?(
              <div className="h-24 flex flex-col justify-center items-center text-gray-300">
                <p className="text-red-500">
                  There is no data to display
                </p>
              </div>
            ):(
              <div>
              <div className="bg-gray-700 rounded-lg overflow-hidden border border-gray-600">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-900">
                      <tr>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                         #
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                          Media House
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                         Total Revenue
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                          Total Commission
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                          Rate
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-600">
                      {masterCommission.mediaHouses.map((item) => (
                        <tr
                          key={item.mediaHouseId}
                          className="hover:bg-gray-600 transition-colors cursor-pointer"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full flex items-center justify-center font-semibold">
                                {item.mediaHouseName.charAt(0)}
                              </div>
                             
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                          <div className="font-medium">{item.mediaHouseName}</div>
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                          {formatCurrency(item.totalRevenue)}
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                            {formatCurrency(item.totalCommission)}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full text-sm">
                              
                              {item.rate}
                              <Percent className="w-3 h-3" />
                            </span>
                          </td>
                         
                          
                          <td className="px-6 py-4">
                         <MasterSetCommissionRate item={item} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            )
          }
          


         
        </div>
      )}
    </div>
  );
}

export default MasterCommissionFilters;
