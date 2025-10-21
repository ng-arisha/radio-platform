"use client";

import { getShowTransactions } from "@/lib/shows/shows";
import { AppDispatch, RootState } from "@/lib/store";
import { formatCurrency, formatDate } from "@/utils/utils";
import { SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function TransactionsList() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.shows.loading);
  const showTransactions = useSelector(
    (state: RootState) => state.shows.showTransactions
  );
  const params = useParams<{ showId: string }>();

  useEffect(() => {
    dispatch(getShowTransactions({ id: params.showId }));
  }, [dispatch, params.showId]);
  return (
    <div>
      {loading === "pending" ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <SunIcon className="animate-spin" size={32} />
          <p className="mt-2">Loading show transactions...</p>
        </div>
      ) : showTransactions.length === 0 ? (
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
                    Transaction ID
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                   Phone Number
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Amount
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
                {showTransactions.map((tx) => (
                  <tr
                    key={tx._id}
                    className="border-t border-gray-600 hover:bg-gray-600 transition"
                  >
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
    </div>
  );
}

export default TransactionsList;
