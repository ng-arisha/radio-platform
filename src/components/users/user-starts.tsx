"use client"

import { AppDispatch, RootState } from "@/lib/store";
import { getMediaHouseUsers, getShowPresenters, getStationAdminUsers } from "@/lib/users/users";
import { Building2, Radio, SunIcon, Tv, Users } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stats from "../shared/stats";
import ActivitySummary from "./activity-summary";
import UsersDistributionGraph from "./users-distribution-graph";

function UserStats() {
   const loading = useSelector((state: RootState) => state.users.loading);
     const mediahouseUsers = useSelector(
       (state: RootState) => state.users.mediahouseUsers
     );
     const stationAdminUsers = useSelector(
       (state: RootState) => state.users.stationAdminUsers
     );
     const presenterUsers = useSelector(
       (state: RootState) => state.users.presenterUsers
     );

     const totalUsers = (mediahouseUsers?.length || 0) + (stationAdminUsers?.length || 0) + (presenterUsers?.length || 0);
     const allUsers = [...(mediahouseUsers || []), ...(stationAdminUsers || []), ...(presenterUsers || [])];
     const distributionData = [
        { name: 'Media House Admins', value: mediahouseUsers?.length || 0, color: '#8b5cf6' },
        { name: 'Station Admins', value: stationAdminUsers?.length || 0, color: '#3b82f6' },
        { name: 'Presenters', value: presenterUsers?.length || 0, color: '#10b981' }
      ];
      const activeUsers = allUsers.filter(user => user.status === 'active').length;
        const inActive = allUsers.filter(user => user.status === 'inactive').length;
        const pendingUsers = allUsers.filter(user => user.status === 'pending').length;

      const statusData = [
        { name: 'Active', value: activeUsers },
        { name: 'Inactive', value: inActive },
        { name: 'Pending', value: pendingUsers }
      ];

     const dispatch = useDispatch<AppDispatch>();
     useEffect(()=>{
         dispatch(getMediaHouseUsers());
         dispatch(getStationAdminUsers());
          dispatch(getShowPresenters());
     },[dispatch])
    return (
        <div>
            {
                loading === 'pending' ? (
                    <div className="h-24 w-full flex flex-col justify-center items-center">
                            <SunIcon className="animate-spin text-gray-100" size={24} />
                    </div>
                ):(
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Stats title="Total Users" value={totalUsers} Icon={Users} />
                        <Stats title="Media House Admins" value={mediahouseUsers?.length || 0} Icon={Building2} />
                        <Stats title="Station Admins" value={stationAdminUsers?.length || 0} Icon={Radio} />
                        <Stats title="Presenters" value={presenterUsers?.length || 0} Icon={Tv} />
                    </div>
                )
            }

            <div className="mt-3">
          <UsersDistributionGraph />
            </div>
            <div className="my-3">
            <ActivitySummary statusData={statusData} />
            </div>
            
        </div>
    )
}

export default UserStats
