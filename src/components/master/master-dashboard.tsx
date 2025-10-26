"use client";

import { getPlatformDashboardData } from "@/lib/master/master";
import { AppDispatch, RootState } from "@/lib/store";
import { formatCurrency } from "@/utils/utils";
import { Building2, DollarSign, Radio, SunIcon, Tv, Users } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function MasterDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.master.loading);
  const data = useSelector(
    (state: RootState) => state.master.masterDashboardData
  );

  useEffect(() => {
    dispatch(getPlatformDashboardData());
  }, [dispatch]);
  return (
    <div className="mt-4">
      {loading === "pending" ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <SunIcon className="animate-spin mb-2" size={24} />
          <p>Loading data...</p>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.map((kpi, idx) => (
              <div
                key={idx}
                className="bg-gray-700 rounded-lg p-6 border border-gray-600"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm mb-2">{kpi.label}</p>
                    <h3 className="text-2xl font-bold text-white mb-2">
                        {
                            kpi.icon === "DollarSign" ? formatCurrency(Number(kpi.value)) : kpi.value
                        }
                      
                    </h3>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-600`}>
                    {kpi.icon === "DollarSign" ? (
                      <DollarSign className={`w-6 h-6 ${kpi.color}`} />
                    ) : kpi.icon === "Building2" ? (
                      <Building2 className={`w-6 h-6 ${kpi.color}`} />
                    ) : kpi.icon === "Radio" ? (
                      <Radio className={`w-6 h-6 ${kpi.color}`} />
                    ) : kpi.icon === "TV" ? (
                      <Tv className={`w-6 h-6 ${kpi.color}`} />
                    ) : kpi.icon === "Users" ? (
                      <Users className={`w-6 h-6 ${kpi.color}`} />
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MasterDashboard;
