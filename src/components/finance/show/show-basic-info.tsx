"use client";

import { Radio } from "lucide-react";
import { useState } from "react";

function ShowBasicInfo() {
    const [query, setQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive"
  >("all");
    return (
        <div>
            <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-900 rounded-lg">
                <Radio className="text-blue-400" size={24} />
              </div>
              <h1 className="text-3xl font-medium text-white">
                Shows Management
              </h1>
            </div>
            <p className="text-gray-400">
              Create, edit, and monitor all shows within your station
            </p>
          </div>

          
        </div>
    )
}

export default ShowBasicInfo
