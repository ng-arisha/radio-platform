"use client";

import { getShowPresenters } from "@/lib/shows/shows";
import { AppDispatch, RootState } from "@/lib/store";
import { formatDate } from "@/utils/utils";
import { SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function TeamMembersList() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.shows.loading);
  const presenters = useSelector(
    (state: RootState) => state.shows.showPresnters
  );
  const params = useParams<{ showId: string }>();

  useEffect(() => {
    dispatch(getShowPresenters({ id: params.showId }));
  }, [dispatch, params.showId]);
  return (
    <div>
      {loading === "pending" ? (
         <div className="h-24 flex flex-col justify-center items-center text-gray-300">
         <SunIcon className="animate-spin" size={32} />
         <p className="mt-2">Loading show transactions...</p>
       </div>
      ) : presenters.length === 0 ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
        
        <p className="mt-2 text-red-500">There are no Team members</p>
    </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-medium text-white">Team Members</h2>
            
          </div>
          <div className="bg-gray-700 rounded-lg border border-gray-600 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Presenter Name
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Email
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Phone Number
                  </th>
                  <th>Role</th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Date Created
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {presenters.map((member, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-gray-600 hover:bg-gray-600 transition"
                  >
                    <td className="p-4 text-white font-medium">
                      {member.user.fullName}
                    </td>
                    <td className="p-4 text-gray-300">{member.user.email}</td>
                    <td className="p-4 text-gray-300">{member.user.phoneNumber}</td>
                    <td className="p-4 text-gray-300 capitalize">{member.role === "co_host" ? "Co- Host" : member.role}</td>

                    <td className="p-4 text-gray-300">{formatDate(member.user.createdAt)}</td>
                    <td className="p-4 text-gray-300">
                      {member.commissionRate}%
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

export default TeamMembersList;
