"use client";

import { Mic, Users } from "lucide-react";
import { useState } from "react";
import MediaShowPresenters from "./media-show-presenters";
import MediaStationAdmins from "./media-station-admins";

function MediaUsersParent() {
  const [activeTab, setActiveTab] = useState("admins");
  return (
    <div>
      <div className="flex gap-4 mb-6 border-b border-gray-700">
        <button
          type="button"
          onClick={() => setActiveTab("admins")}
          className={`flex items-center gap-2 px-4 py-3 cursor-pointer border-b-2 transition-colors ${
            activeTab === "admins"
              ? "border-orange-600 text-orange-500"
              : "border-transparent text-gray-400 hover:text-gray-300"
          }`}
        >
          <Users className="w-4 h-4" />
          <span> Station Admins</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("presenters")}
          className={`flex items-center gap-2 px-4 cursor-pointer py-3 border-b-2 transition-colors ${
            activeTab === "presenters"
              ? "border-orange-600 text-orange-500"
              : "border-transparent text-gray-400 hover:text-gray-300"
          }`}
        >
          <Mic className="w-4 h-4" />
          <span> Presenters</span>
        </button>
      </div>

      {activeTab === "admins" ? (
        <MediaStationAdmins />
      ) : (
        <MediaShowPresenters />
      )}
    </div>
  );
}

export default MediaUsersParent;
