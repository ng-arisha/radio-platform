"use client";

import { getStationPromotions } from "@/lib/promotions/promotion";
import { AppDispatch, RootState } from "@/lib/store";
import { formatCurrency, formatDate } from "@/utils/utils";
import { SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function PromotionSummary() {
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.promotions.loadingPromotions);
    const stationPromotions = useSelector((state: RootState) => state.promotions.stationPromotions);
    const params = useParams<{stationId:string}>();

    useEffect(() => {
        dispatch(getStationPromotions({id:params.stationId}));
    }, [dispatch, params.stationId]);
    return (
        <div>
            {
                loading === 'pending' ? (
                    <div className="h-24 flex items-center justify-center text-gray-300">
                        <SunIcon className="animate-spin mr-2" size={24} />
                        <p>Loading promotions...</p>
                    </div>
                ): stationPromotions.length === 0 ? (
                    <div className="h-24 flex items-center justify-center text-red-500">
                       <p>There are no promotions to display</p>
                    </div>
                ):(
                    <div className="mb-6">
                    <h2 className="text-lg font-semibold text-white mb-3">Active Promotions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {stationPromotions.map(promo => (
                        <div key={promo._id} className="bg-gray-900 rounded-lg shadow-lg p-4 border-l-4 border-green-500">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-white">{promo.name}</h3>
                              <p className="text-sm text-gray-400 mt-1">{promo.show.name}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-lg font-bold text-green-400">{formatCurrency(promo.amount)}</span>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">{formatDate(promo.expiryDate)}</p>
                            </div>
                            <span className="px-2 py-1 text-xs font-medium bg-green-900 text-green-200 rounded">
                              {promo.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
            }
            
        </div>
    )
}

export default PromotionSummary
