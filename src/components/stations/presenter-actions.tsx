"use client";

import { Radio, Search } from "lucide-react";
import { useState } from "react";
import Input from "../shared/input";
import NewPresenter from "./new-presenter";

function PresenterActions() {
  const [query, setQuery] = useState("");
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-900 rounded-lg">
            <Radio className="text-blue-400" size={24} />
          </div>
          <h1 className="text-3xl font-medium text-white">Presenter Management</h1>
        </div>
        <p className="text-gray-400">
          Create, edit, and monitor all show presenters within your station
        </p>
      </div>
     

      <div className="bg-gray-700 rounded-xl p-6 border border-gray-600 shadow-lg mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Search */}
          <div className="flex-1 min-w-[300px] relative">
            <Input
              value={query}
              onChange={setQuery}
              placeholder="Search presenters by name "
              type="text"
              Icon={Search}
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <NewPresenter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PresenterActions;
