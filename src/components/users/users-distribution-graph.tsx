"use client";

import { AppDispatch, RootState } from "@/lib/store";
import { getUserDistribution } from "@/lib/users/users";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReusableLoader from "../shared/reusable-loader";
import UserGraphs from "./user-graphs";

function UsersDistributionGraph() {
    const loading = useSelector((state: RootState) => state.users.loading);
    const distributionData = useSelector((state: RootState) => state.users.userDistribution);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(()=>{
        dispatch(getUserDistribution());
    },[dispatch])
    return (
        <div>
            {
                loading === 'pending' ? (
                    <ReusableLoader />
                ): distributionData.length === 0 ? (
                    <div>
                        <p className="text-center text-gray-500">No user distribution data available.</p>
                    </div>
                ) :(
                    <div>
                        <UserGraphs distributionData={distributionData} />
                    </div>
                )
            }
        </div>
    )
}

export default UsersDistributionGraph
