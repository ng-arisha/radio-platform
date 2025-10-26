"use client";

import Input from "@/components/shared/input";
import { UserRole } from "@/utils/utils";
import { Radio, Search } from "lucide-react";
import { useState } from "react";
import NewShow from "./new-show";

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

          <div className="bg-gray-700 rounded-xl p-6 border border-gray-600 shadow-lg mb-6">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              {/* Search */}
              <div className="flex-1 min-w-[300px] relative">
                <Input
                  value={query}
                  onChange={setQuery}
                  placeholder="Search shows by name or code..."
                  type="text"
                  Icon={Search}
                />
              </div>

              {/* Filters */}
              <div className="flex gap-3">
                <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1 border border-gray-600">
                  <button
                    onClick={() => setFilterStatus("all")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      filterStatus === "all"
                        ? "bg-blue-600 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    All Shows
                  </button>
                  <button
                    onClick={() => setFilterStatus("active")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      filterStatus === "active"
                        ? "bg-green-600 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setFilterStatus("inactive")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      filterStatus === "inactive"
                        ? "bg-gray-600 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Inactive
                  </button>
                </div>

                <NewShow role={UserRole.STATION_ADMIN} />
              </div>
            </div>
          </div>
        </div>
    )
}

export default ShowBasicInfo
