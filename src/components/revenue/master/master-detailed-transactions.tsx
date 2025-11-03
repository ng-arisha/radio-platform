"use client";

import Pagination from "@/components/shared/pagination";
import ReusableLoader from "@/components/shared/reusable-loader";
import Select from "@/components/shared/reusable-select-input";
import { getMasterDetailedTransactions } from "@/lib/revenue/revenue";
import { AppDispatch, RootState } from "@/lib/store";
import { BASE_URL, formatCurrency } from "@/utils/utils";
import { Download, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function MasterDetailedTransactions() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(
    (state: RootState) => state.revenue.loadingMasterDetailedTransactions
  );
  const detailedTransactions = useSelector(
    (state: RootState) => state.revenue.masterDetailedTransactions
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const recordPerPageFilter = [
    { label: "5", value: 5 },
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
  ];
  const [recordsPerPage, setRecordsPerPage] = useState(
    recordPerPageFilter[0].value
  );

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
const handleExportPdf = () => {
    window.open(`${BASE_URL}/transaction/export?type=pdf`, "_blank");
}
const handleExportCsv = () => {
    window.open(`${BASE_URL}/transaction/export?type=csv`, "_blank");
}
  const fetchMasterDetailedTransactions = async (
    page: number,
    limit: number
  ) => {
    dispatch(getMasterDetailedTransactions({ page, limit }));
  };

  useEffect(() => {
    fetchMasterDetailedTransactions(currentPage, recordsPerPage);
  }, [currentPage, recordsPerPage]);
  return (
    <div className="mt-6">
      {loading === "pending" && detailedTransactions !== null ? (
        <ReusableLoader />
      ) : detailedTransactions && detailedTransactions!.data.length === 0 ? (
        <div className="h-24 flex flex-col items-center justify-center ">
          <p className="text-gray-400">No detailed transactions available.</p>
        </div>
      ) : (
        <div>
          <div className="bg-gray-750 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-white">
                  Detailed Transaction Data
                </h3>
                <div className="flex gap-3">
                  <button
                  onClick={handleExportPdf}
                    type="button"
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Download size={16} />
                    PDF
                  </button>
                  <button
                  onClick={handleExportCsv}
                    type="button"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Download size={16} />
                    CSV
                  </button>
                  {/* <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Download size={16} />
                    Excel
                  </button> */}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Media House
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Station
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Paybill
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Deposits
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Payouts
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Net Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Participants
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {detailedTransactions &&
                    detailedTransactions!.data.map((row, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {row.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {row.mediaHouse}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {row.station}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                          {row.paybill}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400">
                          {formatCurrency(row.deposits)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-400">
                          {formatCurrency(row.payouts)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400 font-semibold">
                          {formatCurrency(row.net)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {row.participants}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-6">
              <Select
                Icon={Filter}
                value={recordsPerPage}
                onChange={(e) => setRecordsPerPage(Number(e))}
                options={recordPerPageFilter}
              />
              {loading === "succeeded" && detailedTransactions !== null && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={detailedTransactions!.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MasterDetailedTransactions;
