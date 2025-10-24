"use client";

import { getSingleMediaHouse } from "@/lib/media/media";
import { AppDispatch, RootState } from "@/lib/store";
import { getCurrentDateTime } from "@/utils/utils";
import { Bell, Radio, SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function MediaHouseInfo() {
    const params = useParams<{ mediaIdd: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.media.loading);
    const mediaHouse = useSelector((state: RootState) => state.media.mediaHouse);
    const [dateTime, setDateTime] = useState(getCurrentDateTime());

    useEffect(() => {
        const interval = setInterval(() => {
          setDateTime(getCurrentDateTime());
        }, 60000); // update every 1 minute
    
        return () => clearInterval(interval);
      }, []);

      useEffect(() => {
          dispatch(getSingleMediaHouse({ id: params.mediaIdd }));
        }, [dispatch, params.mediaIdd]);
    return (
        <div>
      {loading === "pending" || mediaHouse === null ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <SunIcon className="animate-spin mb-2" size={24} />
          <p>Loading Media information...</p>
        </div>
      ) : (
        <header className="bg-gray-900 border-b border-gray-700 px-8 py-5 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Radio className="text-white" size={26} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {mediaHouse.name}
                </h1>
                <p className="text-gray-400 text-sm font-medium">
                  {mediaHouse.address} • {mediaHouse.status}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-gray-400 text-sm">
                  {dateTime.formattedDate}
                </p>
                <p className="text-white text-sm font-semibold">
                  {dateTime.formattedTime}
                </p>
              </div>
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <Bell size={22} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-11 h-11 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg cursor-pointer hover:scale-105 transition-transform">
                SA
              </div>
            </div>
          </div>
        </header>
      )}
    </div>
    )
}

export default MediaHouseInfo
