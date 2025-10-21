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
        <div className=""></div>
      ) : presenters.length === 0 ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
        <SunIcon className="animate-spin" size={32} />
        <p className="mt-2">Loading show presenter...</p>
    </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Team Members</h2>
            
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
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Joined At
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
                      {member.fullName}
                    </td>
                    <td className="p-4 text-gray-300">{member.email}</td>
                    <td className="p-4 text-gray-300">{member.phoneNumber}</td>

                    <td className="p-4 text-gray-300">{formatDate(member.createdAt)}</td>
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
