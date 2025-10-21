"use client";

import { getShowPromotions } from "@/lib/shows/shows";
import { AppDispatch, RootState } from "@/lib/store";
import { formatCurrency, formatDate } from "@/utils/utils";
import { SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function PromotionList() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.shows.loading);
  const promotions = useSelector(
    (state: RootState) => state.shows.showPromotions
  );
  const params = useParams<{ showId: string }>();

  useEffect(() => {
    dispatch(getShowPromotions({ id: params.showId }));
  }, [dispatch]);
  return (
    <div>
      {loading === "pending" ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <SunIcon className="animate-spin" size={32} />
          <p className="mt-2">Loading show promotions...</p>
        </div>
      ) : promotions.length === 0 ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <p className="mt-2 text-red-500">
            There are no promotions allocated to this show
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              Live Show Promotions
            </h2>
          </div>

          <div className="bg-gray-700 rounded-lg border border-gray-600 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Bonus Name
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Amount
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Status
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Created At
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Expiry
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {promotions.map((bonus) => (
                  <tr
                    key={bonus._id}
                    className="border-t border-gray-600 hover:bg-gray-600 transition"
                  >
                    <td className="p-4 text-white font-medium">{bonus.name}</td>
                    <td className="p-4 text-green-400 font-bold">
                      {" "}
                      {formatCurrency(bonus.amount)}
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-green-500/20 bg-opacity-20 text-green-400 rounded-full text-sm">
                        {bonus.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300">
                      {formatDate(bonus.createdAt)}
                    </td>
                    <td className="p-4 text-gray-300">
                      {formatDate(bonus.expiryDate)}
                    </td>
                    <td className="p-4">
                      <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm">
                        Stop
                      </button>
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

export default PromotionList;
