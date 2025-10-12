"use client";

import { getAllMediaHouses } from "@/lib/media/media";
import { AppDispatch, RootState } from "@/lib/store";
import { SunIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MediaHouseTable from "./media-house-table";

function MediaHousesList() {
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.media.loading);
    const mediaHouses = useSelector((state: RootState) => state.media.mediaHouses);

    useEffect(() => {
        dispatch(getAllMediaHouses());
    }, [dispatch]);
    return (
        <div>
            {
                loading === "pending" ? (
                    <div className="h-24 flex justify-center items-center w-full text-gray-100 ">
                        <SunIcon className="animate-spin" size={24} />
                    </div>
                ):mediaHouses.length === 0 ? (
                    <div className="h-24 flex justify-center items-center w-full text-red-500 ">
                        <p>There are Media houses in our records</p>
                    </div>
                ):(
                    <MediaHouseTable mediaHouses={mediaHouses} />
                )
            }
            
        </div>
    )
}

export default MediaHousesList
