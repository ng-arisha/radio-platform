import { Download } from "lucide-react";

function RevenueInfo() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-medium text-white mb-2">
              Global Revenue Report
            </h1>
            <p className="text-gray-400">
              Comprehensive analytics across all media houses, stations, and
              shows
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <Download size={16} />
              PDF
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <Download size={16} />
              CSV
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <Download size={16} />
              Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenueInfo;
