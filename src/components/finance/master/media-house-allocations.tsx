"use client";

import { getFinanceAllocations } from "@/lib/stats/stats";
import { AppDispatch, RootState } from "@/lib/store";
import { formatCurrency, formatDate } from "@/utils/utils";
import { Eye, Plus, SunIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function MediaHouseAllocations() {
    const loading = useSelector((state:RootState)=>state.stats.loadingAllocations)
    const mediaHouses = useSelector((state:RootState)=>state.stats.financeAllocations)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{
        dispatch(getFinanceAllocations())
    },[])
    return (
       <>
       {
        loading === 'pending' ? (
            <div className="h-24 flex flex-col justify-center items-center">
                    <SunIcon className="animate-spin text-gray-500" size={24} />
                    <p className="text-gray-500">Loading data...</p>
                </div>
        ): mediaHouses.length === 0 ? (
            <div className="h-24 flex flex-col justify-center items-center">
            <p className="text-gray-500">No data available</p>
          </div>
        ):(
            <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Media House Allocations</h3>
              <button onClick={()=>console.log("Clicked")} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center gap-2 transition">
                <Plus size={18} /> Allocate Funds
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Media House</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Allocated</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Utilized</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Remaining</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Revenue</th>
                    {/* <th className="text-left py-3 px-4 text-gray-400 font-medium">Payouts</th> */}
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Last Allocation</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mediaHouses.map((house) => (
                    <tr key={house._id} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                      <td className="py-3 px-4 font-medium">{house.media.name}</td>
                      <td className="py-3 px-4">{formatCurrency(house.allocated)}</td>
                      <td className="py-3 px-4 text-blue-400">{formatCurrency(house.utilized)}</td>
                      <td className="py-3 px-4 text-green-400">{formatCurrency(house.allocated - house.utilized)}</td>
                      <td className="py-3 px-4 font-semibold">{formatCurrency(house.revenue)}</td>
                      {/* <td className="py-3 px-4">{formatCurrency(house.payouts)}</td> */}
                      <td className="py-3 px-4 text-sm text-gray-400">{formatDate(house.createdAt)}</td>
                      <td className="py-3 px-4">
                       <Eye size={18} className="text-gray-400 hover:text-gray-200 cursor-pointer" onClick={()=>console.log("View details")} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
       }
       
       </>
    )
}

export default MediaHouseAllocations
