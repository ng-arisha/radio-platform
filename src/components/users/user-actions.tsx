"use client";

import { useState } from "react";

function UserActions() {
    const dateFilters = [
        {label: 'Today', value: 'today'},
        {label: 'This Week', value: 'this_week'},
        {label: 'This Month', value: 'this_month'},
    ]
    const [selectedFilter, setSelectedFilter] = useState('today');

    const handleExport = () => {
        // Implement export functionality here
    }
    return (
        <div className="flex items-center space-x-2">
            <select
                id="date-filter"
                name="date-filter"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full pl-3 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select Station</option>
                {dateFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>

              {/* <Button 
              onClick={handleExport}
              className="flex space-x-2 items-center cursor-pointer" variant="secondary">
                <Download size={16} />
                <span>Export</span>
              </Button> */}
        </div>
    )
}

export default UserActions
