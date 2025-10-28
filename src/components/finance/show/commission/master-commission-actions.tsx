"use client";

import MasterCommissionFilters from "@/components/commission/master-commission-filters";
import { Wallet, Wallet2 } from "lucide-react";
import { useState } from "react";

function MsterCommissionActions() {
    const [activeTab, setActiveTab] = useState("income");
    return (
        <div>
             <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-900 rounded-lg">
            <Wallet className="text-blue-400" size={24} />
          </div>
          <h1 className="text-3xl font-medium text-white">
            Master Commission Dashboard
          </h1>
        </div>
        <p className="text-gray-400">
          Overview of Revenue performance accross all media houses
        </p>
      </div>
             <div className="flex gap-4 mb-6 border-b border-gray-700">
        <button
          type="button"
          onClick={() => setActiveTab("income")}
          className={`flex items-center gap-2 px-4 py-3 cursor-pointer border-b-2 transition-colors ${
            activeTab === "income"
              ? "border-orange-600 text-orange-500"
              : "border-transparent text-gray-400 hover:text-gray-300"
          }`}
        >
          <Wallet2 className="w-4 h-4" />
          <span> Income</span>
        </button>
        {/* <button
          type="button"
          onClick={() => setActiveTab("rates")}
          className={`flex items-center gap-2 px-4 cursor-pointer py-3 border-b-2 transition-colors ${
            activeTab === "rates"
              ? "border-orange-600 text-orange-500"
              : "border-transparent text-gray-400 hover:text-gray-300"
          }`}
        >
          <Percent className="w-4 h-4" />
          <span> Rates</span>
        </button> */}
      </div>
      {
        activeTab === "income" ? (
          <MasterCommissionFilters />
        ) : (
          <div>Rates Content</div>
        )
      }
            
        </div>
    )
}

export default MsterCommissionActions
