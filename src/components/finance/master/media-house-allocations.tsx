"use client";

import { getFinanceAllocations } from "@/lib/stats/stats";
import { AppDispatch, RootState } from "@/lib/store";
import { SunIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MediaHouseAloocationTable from "./media-house-allocation-table";


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
             {/* <AllocateFundsModal /> */}
            </div>
            <MediaHouseAloocationTable mediaHouses={mediaHouses} />
          </div>
        )
       }
       
       </>
    )
}

export default MediaHouseAllocations
