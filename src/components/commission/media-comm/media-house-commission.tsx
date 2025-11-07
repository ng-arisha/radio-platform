"use client";

import Input from "@/components/shared/input";
import ReusableLoader from "@/components/shared/reusable-loader";
import Select from "@/components/shared/reusable-select-input";
import { getMediaHouseCommission } from "@/lib/commission/commission";
import { AppDispatch, RootState } from "@/lib/store";
import { formatCurrency, range } from "@/utils/utils";
import { Filter, Percent, Wallet } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AssignMediaHouseCommissionRtae from "./assign-media-house-commission-rate";

function MediaHouseCommission() {

  const [activeRange, setActiveRange] = useState("1d");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const loading = useSelector((state: RootState) => state.commission.loading);
  const masterCommission = useSelector(
    (state: RootState) => state.commission.mediaCommission
  );
  const params = useParams<{ mediaId: string }>();

  const fetchMasterCommission = async (range: string,fromDate:string,toDate:string) => {
    await dispatch(
      getMediaHouseCommission({ range: range, id: params.mediaId, fromDate, toDate })
    );
  };

  useEffect(() => {
    if(fromDate && toDate){
      fetchMasterCommission(activeRange, fromDate, toDate);
    }else if(!fromDate && !toDate){
      fetchMasterCommission(activeRange, "", "");
    }
    // fetchMasterCommission(activeRange);
  }, [activeRange, fromDate, toDate]);
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-900 rounded-lg">
            <Wallet className="text-blue-400" size={24} />
          </div>
          <h1 className="text-3xl font-medium text-white">
            Media House Commission Dashboard
          </h1>
        </div>
        <p className="text-gray-400">
          Overview of Revenue performance accross all media houses
        </p>
      </div>
      <div className="bg-gray-700 rounded-xl p-6 border border-gray-600 shadow-lg mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Search */}

          {/* Filters */}
          <div className="flex gap-3">
            <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1 border border-gray-600">
              <Input value={fromDate} onChange={setFromDate} type="date" />
              <div>
                <p>To</p>
              </div>
              <Input value={toDate} onChange={setToDate} type="date" />
              <Select
                value={activeRange}
                onChange={(value) => setActiveRange(value)}
                options={range}
                Icon={Filter}
              />
             
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
                {formatCurrency(masterCommission.totalRevenue)}
              </p>
            </div>

            {/* total commission */}
            <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
              <p className="text-gray-400 text-sm mb-2">Total Commission</p>
              <p className="text-3xl font-bold text-white">
                {formatCurrency(masterCommission.totalCommission)}
              </p>
            </div>
          </div>
          <h1 className="text-lg font-medium pb-2">Individual Contributions</h1>

          {masterCommission.stations.length === 0 ? (
            <div className="h-24 flex flex-col justify-center items-center text-gray-300">
              <p className="text-red-500">There is no data to display</p>
            </div>
          ) : (
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
                          Media House - Station Name
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
                      {masterCommission.stations.map((item) => (
                        <tr
                          key={item.commissionId}
                          className="hover:bg-gray-600 transition-colors cursor-pointer"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full flex items-center justify-center font-semibold">
                                {item.stationName.charAt(0)}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                            <div className="font-medium">
                              {masterCommission.mediaHouseName}-
                              {item.stationName}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                            {formatCurrency(item.totalRevenue)}
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                            {formatCurrency(item.totalCommission)}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full text-sm">
                              {item.commissionRate}
                              <Percent className="w-3 h-3" />
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            {/* <MasterSetCommissionRate item={item} /> */}
                            <AssignMediaHouseCommissionRtae item={item} />
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
      )}
    </div>
  );
}

export default MediaHouseCommission;
