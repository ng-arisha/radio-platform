"use client";

import { getMediaTransactionHistory } from "@/lib/media/media";
import { AppDispatch, RootState } from "@/lib/store";
import { formatCurrency, formatDate } from "@/utils/utils";
import { SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function MediaHouseTransactions() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.media.loading);
  const transactions = useSelector(
    (state: RootState) => state.media.mediaShowTransactionHistory
  );

  const params = useParams<{ mediaIdd: string }>();
  useEffect(() => {
    dispatch(getMediaTransactionHistory({ id: params.mediaIdd }));
  }, [dispatch, params.mediaIdd]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "revenue":
        return "text-blue-400";
      case "Allocation":
        return "text-purple-400";
      case "Payout":
        return "text-orange-400";
      default:
        return "text-gray-400";
    }
  };
  return (
    <div className="mt-4">
      {loading === "pending" ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <SunIcon className="animate-spin mb-2" size={24} />
          <p>Loading data...</p>
        </div>
      ) : transactions.length === 0 ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <p>There are no transactions to display</p>
        </div>
      ) : (
        <div>
          <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-950 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Transaction ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Station
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Amount
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {transactions.map((tx) => (
                    <tr
                      key={tx._id}
                      className="hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-mono text-blue-400">
                        {tx._id.slice(0, 8).toUpperCase()}
                      </td>
                      <td className="px-6 py-4 text-sm">{tx.show?.name}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`font-medium ${getTypeColor(tx.type)}`}
                        >
                          {tx.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold">
                        {formatCurrency(tx.amount)}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-400">
                        {formatDate(tx.createdAt)}
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

export default MediaHouseTransactions;
