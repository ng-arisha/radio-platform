"use client";

import { AppDispatch, RootState } from "@/lib/store";
import { getMediaHouseWinners } from "@/lib/users/users";
import { formatCurrency, formatDate } from "@/utils/utils";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReusableLoader from "../shared/reusable-loader";

function MediaHouseWinnersList() {
    const dispatch = useDispatch<AppDispatch>()
    const winners = useSelector((state: RootState) => state.users.mediaHouseWinners)
    const loading = useSelector((state: RootState) => state.users.loadingWinners)
    const params = useParams<{ mediaId: string }>();

    useEffect(() => {
        dispatch(getMediaHouseWinners({mediaId:params.mediaId}))
    }, [params.mediaId])
    return (
        <div>
        {
         loading === "pending" ? (
             <ReusableLoader
             />
         ): winners.length === 0 ?  (
             <div>
                 No winners yet
             </div>
         ):(
             <div className="bg-gray-700 rounded-lg border border-gray-600 overflow-hidden">
             <table className="w-full">
               <thead className="bg-gray-800">
                 <tr>
                   <th className="text-left p-4 text-gray-300 font-semibold">
                     Phone Number
                   </th>
                   <th className="text-left p-4 text-gray-300 font-semibold">
                     Amount
                   </th>
                   <th className="text-left p-4 text-gray-300 font-semibold">
                     Station
                   </th>
                   <th className="text-left p-4 text-gray-300 font-semibold">
                     Show
                   </th>
                   <th className="text-left p-4 text-gray-300 font-semibold">
                     Promotion
                   </th>
                   <th className="text-left p-4 text-gray-300 font-semibold">
                     Date
                   </th>
                  
                 </tr>
               </thead>
               <tbody>
                 {winners.map((tx) => (
                   <tr
                     key={tx._id}
                     className="border-t border-gray-600 hover:bg-gray-600 transition"
                   >
                     <td className="p-4 text-white font-mono">
                       {tx.phoneNumber || "N/A"}
                     </td>
                     <td className="p-4 text-white font-mono">
                       {tx.amount ? formatCurrency(tx.amount) : "N/A"}
                     </td>
                     <td className="p-4 text-white font-normal">
                      {tx.stationName}
                     </td>
                     <td className="p-4 text-white font-normal">
                      {tx.show.name}
                     </td>
                     <td className="p-4 text-white font-normal">
                       {tx.promotion ? tx.promotion.name : "N/A"}
                     </td>
                     <td className="p-4">
                      {formatDate(tx.createdAt)}
                     </td>
                    
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         )
        }
     </div>
    )
}

export default MediaHouseWinnersList
