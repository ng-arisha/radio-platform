"use client";

import { getCurrentDateTime } from "@/utils/utils";
import { Bell, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

function MasterHeader() {

     const [dateTime, setDateTime] = useState(getCurrentDateTime());
    
        useEffect(() => {
            const interval = setInterval(() => {
              setDateTime(getCurrentDateTime());
            }, 60000); // update every 1 minute
        
            return () => clearInterval(interval);
          }, []);
    return (
        <div>
            <header className="bg-gray-900 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
             
              <div>
                <h2 className="text-lg font-semibold text-white">Master Admin Dashboard</h2>
                <p className="text-sm text-gray-400">{dateTime.formattedDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-400 hover:text-white">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center">
                  <span className="text-sm font-medium">MA</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">Master Admin</p>
                  <p className="text-xs text-gray-400">{dateTime.formattedTime}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </header>
        </div>
    )
}

export default MasterHeader
