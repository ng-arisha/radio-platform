"use client";

import { getMediaTransactionHistory } from "@/lib/media/media";
import { AppDispatch, RootState } from "@/lib/store";
import { getMediaTransactions } from "@/lib/transactions/transaction";
import { formatCurrency, formatDate, timeFilters, transactionsType } from "@/utils/utils";
import { Clock, Filter, Receipt, Search } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../shared/input";
import Pagination from "../shared/pagination";
import ReusableLoader from "../shared/reusable-loader";
import Select from "../shared/reusable-select-input";

function MediaHouseTransactions() {
  const [phoneNumber, setPhoneNumber] = useState("");
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
  const loading = useSelector((state: RootState) => state.transactions.loading);
  const transactions = useSelector(
    (state: RootState) => state.transactions.mediaTransactions
  );
const handleFetchtransactions = async (timeRange: string,
    phoneNumber: string,
    type: string,
    page: number,
    limit: number) => {
    await dispatch(
      getMediaTransactions({
        id: params.mediaIdd,
        timeRange,
        phoneNumber,
        type,
        page,
        limit,
      })
    );
    
  }

  useEffect(() => {
    handleFetchtransactions(selectedTimeFilter,phoneNumber,selectedTransactionType,currentPage,recordsPerPage);
  }, [selectedTimeFilter,phoneNumber,selectedTransactionType,currentPage,recordsPerPage]);
  const params = useParams<{ mediaIdd: string }>();
  useEffect(() => {
    dispatch(getMediaTransactionHistory({ id: params.mediaIdd }));
  }, [dispatch, params.mediaIdd]);

 
  return (
    <div className="mt-4">
        <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-900 rounded-lg">
            <Receipt className="text-blue-400" size={24} />
          </div>
          <h1 className="text-3xl font-medium text-white">
            Transaction Visibility
          </h1>
        </div>
        <p className="text-gray-400">
          View the transactions across all shows and media houses
        </p>
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

      
      {loading === "pending" || transactions === null ? (
        <ReusableLoader />
      ) : (
        <div>
          <div className="max-w-7xl mx-auto">
            {/* Promotions Table */}
            <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white">
                  Transactions
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Show
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Tx Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Phone Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-900 divide-y divide-gray-800">
                    {transactions.data.map((tx) => (
                      <tr key={tx._id} className="hover:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                          {tx.show!.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {tx.transactionCode.slice(0, 9)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                          {formatCurrency(tx.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded`}
                          >
                            {tx.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {tx.phoneNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {formatDate(tx.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
       {
        loading === 'succeeded' && transactions !== null && (
            <Pagination
            currentPage={currentPage}
            totalPages={transactions!.totalPages}
            onPageChange={handlePageChange}
          />
        )
       }
      </div>
    </div>
  );
}

export default MediaHouseTransactions;
