"use client";

import { RootState } from "@/lib/store";
import { UserRole } from "@/utils/utils";
import { Radio } from "lucide-react";
import { useSelector } from "react-redux";
import NewShow from "./new-show";

function ShowBasicInfo() {
  const user = useSelector((state: RootState) => state.auth.tokenuser);
    return (
        <div>
            <div className="mb-8">
            <div className="flex justify-between items-center gap-3 mb-2">
              <div>
              <div className="p-2 ">
                <Radio className="text-blue-400" size={24} />
              </div>
              <h1 className="text-3xl font-medium text-white">
                Shows Management
              </h1>
              </div>
             {user?.role === UserRole.MEDIA_HOUSE && <NewShow role={UserRole.MEDIA_HOUSE} />}
            </div>
            <p className="text-gray-400">
              Create, edit, and monitor all shows within your station
            </p>
          </div>

          
        </div>
    )
}

export default ShowBasicInfo
