"use client";

import { getStationTransactions } from "@/lib/finance/finance";
import { AppDispatch, RootState } from "@/lib/store";
import {
  formatCurrency,
  formatDate,
  timeFilters,
  transactionsType,
} from "@/utils/utils";
import { Clock, Filter, Receipt, Search, SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../shared/input";
import Pagination from "../shared/pagination";
import Select from "../shared/reusable-select-input";

function StationTransactionList() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
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
  const [selectedTimeFilter, setSelectedTimeFilter] = useState(
    timeFilters[0].value
  );
  const [selectedTransactionType, setSelectedTransactionType] = useState(
    transactionsType[0].value
  );
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(
    (state: RootState) => state.finance.loadingShowData
  );
  const showTransactions = useSelector(
    (state: RootState) => state.finance.stationTransactionsData
  );
  const params = useParams<{ stationId: string }>();

  const handleFetchtransactions = async (
    timeRange: string,
    phoneNumber: string,
    type: string,
    page: number,
    limit: number,
    startDate: string,
    endDate: string
  ) => {
    await dispatch(
      getStationTransactions({
        id: params.stationId,
        range: timeRange,
        phoneNumber,
        type,
        page,
        limit,
        startDate,
        endDate,
      })
    );
  };

  useEffect(() => {
    if (startDate && endDate) {
      handleFetchtransactions(
        selectedTimeFilter,
        phoneNumber,
        selectedTransactionType,
        currentPage,
        recordsPerPage,
        startDate,
        endDate
      );
      setEndDate("");
      setStartDate("");
    } else if (!startDate && !endDate) {
      handleFetchtransactions(
        selectedTimeFilter,
        phoneNumber,
        selectedTransactionType,
        currentPage,
        recordsPerPage,
        "",
        ""
      );
    }
  }, [
    selectedTimeFilter,
    phoneNumber,
    selectedTransactionType,
    currentPage,
    recordsPerPage,
    startDate,
    endDate,
  ]);
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-900 rounded-lg">
            <Receipt className="text-blue-400" size={24} />
          </div>
          <h1 className="text-3xl font-medium text-white">
            Transaction Visibility
          </h1>
        </div>
        <p className="text-gray-400">View the transactions across all shows</p>
      </div>

      <div className="bg-gray-700 rounded-xl p-6 border border-gray-600 shadow-lg mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Search */}
          <div className="flex-1 min-w-[300px] relative">
            <Input
              value={phoneNumber}
              onChange={setPhoneNumber}
              placeholder="+2557123456..."
              type="text"
              Icon={Search}
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1 border border-gray-600">
              <Input value={startDate} onChange={setStartDate} type="date" />
              <div>
                <p>To</p>
              </div>
              <Input value={endDate} onChange={setEndDate} type="date" />
              <Select
                Icon={Clock}
                value={selectedTimeFilter}
                onChange={setSelectedTimeFilter}
                options={timeFilters}
              />
              <Select
                Icon={Filter}
                value={selectedTransactionType}
                onChange={setSelectedTransactionType}
                options={transactionsType}
              />
            </div>
          </div>
        </div>
      </div>

      {loading === "pending" || showTransactions === null ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <SunIcon className="animate-spin" size={32} />
          <p className="mt-2">Loading show transactions...</p>
        </div>
      ) : showTransactions!.data.length === 0 ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <p className="mt-2 text-red-500">
            There are no transactions in this show
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-medium text-white">
              Transaction History
            </h2>
            {/* <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
          Export CSV
        </button> */}
          </div>

          <div className="bg-gray-700 rounded-lg border border-gray-600 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Show
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Transaction ID
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Amount
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Phone Number
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Type
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {showTransactions!.data.map((tx) => (
                  <tr
                    key={tx._id}
                    className="border-t border-gray-600 hover:bg-gray-600 transition"
                  >
                    <td className="p-4 text-white font-mono">
                      {tx.show?.name || "N/A"}
                    </td>
                    <td className="p-4 text-white font-mono">
                      {tx.transactionCode.slice(0, 9).toUpperCase()}
                    </td>
                    <td className="p-4 text-white font-normal">
                      {formatCurrency(tx.amount)}
                    </td>
                    <td className="p-4 text-white font-normal">
                      {tx.phoneNumber}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          tx.type === "Bonus".toLocaleLowerCase()
                            ? "bg-orange-500/20 bg-opacity-20 text-orange-400"
                            : tx.type === "Revenue".toLocaleLowerCase()
                              ? "bg-green-500/20 bg-opacity-20 text-green-400"
                              : "bg-blue-500/20 bg-opacity-20 text-blue-400"
                        }`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300">
                      {formatDate(tx.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mt-6">
        <Select
          Icon={Filter}
          value={recordsPerPage}
          onChange={(e) => setRecordsPerPage(Number(e))}
          options={recordPerPageFilter}
        />
        {loading === "succeeded" && showTransactions !== null && (
          <Pagination
            currentPage={currentPage}
            totalPages={showTransactions!.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default StationTransactionList;
