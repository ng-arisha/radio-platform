"use client";

import Input from "@/components/shared/input";
import { getShowStats } from "@/lib/shows/shows";
import { AppDispatch, RootState } from "@/lib/store";
import { DollarSign, Gift, SunIcon, TrendingUp, Users } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ShowStats() {
  const dispatch = useDispatch<AppDispatch>();
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const params = useParams<{ showId: string }>();
  const loading = useSelector((state: RootState) => state.shows.loadingStats);
  const showStats = useSelector((state: RootState) => state.shows.showStats);

  const handlegetShowStats = async (startDate: string, endDate: string) => {
    await dispatch(
      getShowStats({ id: params.showId, startDate, endDate })
    );
  }

  useEffect(() => {
    if( fromDate && toDate ){
        handlegetShowStats(fromDate, toDate);
       
    }else if( !fromDate && !toDate ){
        dispatch(getShowStats({ id: params.showId }));
    }
    
  }, [params.showId, dispatch, fromDate, toDate]);
  return (
    <div>
      <div className="flex justify-end items-center gap-2 rounded-lg p-1  mb-4">
        <Input value={fromDate} onChange={setFromDate} type="date" />
        <div>
          <p>To</p>
        </div>
        <Input value={toDate} onChange={setToDate} type="date" />
      </div>
      {loading === "pending" ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <SunIcon className="animate-spin" size={32} />
          <p className="mt-2">Loading show statistics...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {showStats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-700 rounded-lg p-6 border border-gray-600"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`p-3 rounded-lg bg-${stat.color}-500 bg-opacity-20`}
                >
                  {stat.icon === "DollarSign" ? (
                    <DollarSign
                      className={`text-${stat.color}-400`}
                      size={24}
                    />
                  ) : stat.icon === "Users" ? (
                    <Users className={`text-${stat.color}-400`} size={24} />
                  ) : stat.icon === "TrendUp" ? (
                    <TrendingUp
                      className={`text-${stat.color}-400`}
                      size={24}
                    />
                  ) : (
                    <Gift className={`text-${stat.color}-400`} size={24} />
                  )}
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{stat.label}</h3>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowStats;
