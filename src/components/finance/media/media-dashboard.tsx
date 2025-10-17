"use client";

import { getMediaSummary } from "@/lib/stats/stats";
import { AppDispatch, RootState } from "@/lib/store";
import { ArrowUpRight, Building2, CreditCard, DollarSign, SunIcon, Target } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function MediaDashboard() {
    const params = useParams<{mediaId:string}>()
    const dispatch = useDispatch<AppDispatch>()
    const mediaSummary = useSelector((state:RootState)=>state.stats.mediaSummary)
    const loading = useSelector((state:RootState)=>state.stats.loading)
    useEffect(()=>{
        dispatch(getMediaSummary({id: params.mediaId}))
    },[])
    return (
        <div className="mt-6">
            {
                loading === 'pending' ? (
                    <div className="h-24 flex flex-col justify-center items-center text-gray-400">
                        <SunIcon className="animate-spin " size={24} />
                    </div>
                ): mediaSummary.length === 0 ? (
                    <div className="flex flex-col justify-center items-center h-24 text-gray-400">
                        <p>No summary data available.</p>
                    </div>
                ):(
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaSummary.map((kpi, idx) => (
          <div key={idx} className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition">
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg `}>
                {
                  kpi.icon === 'DollarSign' ? (
                    <DollarSign size={20} className={`text-${kpi.color}-400`} />
                  ): kpi.icon === 'CreditCard' ? (
                    <CreditCard size={20} className={`text-${kpi.color}-400`} />
                  ): kpi.icon === 'ArrowUpRight' ? (
                    <ArrowUpRight size={20} className={`text-${kpi.color}-400`} />
                  ): kpi.icon === 'Building2' ? (
                    <Building2  size={20} className={`text-${kpi.color}-400`} />
                  ): kpi.icon === 'Target' ? (
                    <Target size={20} className={`text-${kpi.color}-400`} />
                  ): null
                }
              </div>
              {/* <div className={`flex items-center gap-1 text-sm ${kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {kpi.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {Math.abs(kpi.change)}%
              </div> */}
            </div>
            <div className="text-2xl font-bold mb-1">{kpi.value}</div>
            <div className="text-sm text-gray-400">{kpi.label}</div>
          </div>
        ))}
        </div>
                )
            }
        </div>
    )
}

export default MediaDashboard
