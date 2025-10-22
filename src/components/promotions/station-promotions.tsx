"use client";

import { getStationPromotions } from "@/lib/promotions/promotion";
import { AppDispatch, RootState } from "@/lib/store";
import { formatDate } from "@/utils/utils";
import { Edit, SunIcon, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function StationPromotions() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(
    (state: RootState) => state.promotions.loadingPromotions
  );
  const stationPromotions = useSelector(
    (state: RootState) => state.promotions.stationPromotions
  );
  const params = useParams<{ stationId: string }>();

  useEffect(() => {
    dispatch(getStationPromotions({ id: params.stationId }));
  }, [dispatch, params.stationId]);

  const getStatusColor = (status:string) => {
    switch(status) {
      case 'active': return 'bg-green-900 text-green-200';
      case 'scheduled': return 'bg-blue-900 text-blue-200';
      case 'inactive': return 'bg-gray-700 text-gray-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };
  return (
    <div>
      {loading === "pending" ? (
        <div className="h-24 flex items-center justify-center text-gray-300">
          <SunIcon className="animate-spin mr-2" size={24} />
          <p>Loading promotions...</p>
        </div>
      ) : stationPromotions.length === 0 ? (
        <div className="h-24 flex items-center justify-center text-red-500">
          <p>There are no promotions to display</p>
        </div>
      ) : (
        <div>
          <div className="max-w-7xl mx-auto">
            {/* Promotions Table */}
            <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white">
                  All Promotions
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Show
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Due 
                      </th>
                      
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-900 divide-y divide-gray-800">
                    {stationPromotions.map((promo) => (
                      <tr key={promo._id} className="hover:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                          {promo.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {promo.show.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                          KES {promo.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded`}
                          >
                            {promo.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(promo.status)}`}
                          >
                            {promo.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {formatDate(promo.expiryDate)}
                        </td>
                       
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-2">
                            <button className="text-blue-400 hover:text-blue-300">
                              <Edit size={18} />
                            </button>
                            <button
                              
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
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
    </div>
  );
}

export default StationPromotions;
