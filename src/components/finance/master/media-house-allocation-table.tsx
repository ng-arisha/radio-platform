import { formatCurrency, formatDate } from "@/utils/utils";
import { Eye } from "lucide-react";

function MediaHouseAloocationTable({
  mediaHouses,
}: {
  mediaHouses: FinanceAllocationsType[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left py-3 px-4 text-gray-400 font-medium">
              Media House
            </th>
            <th className="text-left py-3 px-4 text-gray-400 font-medium">
              Allocated
            </th>
            <th className="text-left py-3 px-4 text-gray-400 font-medium">
              Utilized
            </th>
            <th className="text-left py-3 px-4 text-gray-400 font-medium">
              Remaining
            </th>
            <th className="text-left py-3 px-4 text-gray-400 font-medium">
              Revenue
            </th>
            {/* <th className="text-left py-3 px-4 text-gray-400 font-medium">Payouts</th> */}
            <th className="text-left py-3 px-4 text-gray-400 font-medium">
              Last Allocation
            </th>
            <th className="text-left py-3 px-4 text-gray-400 font-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {mediaHouses.map((house) => (
            <tr
              key={house._id}
              className="border-b border-gray-800 hover:bg-gray-800/50 transition"
            >
              <td className="py-3 px-4 font-medium">
                {house.media ? house.media.name : house.station?.name}
              </td>
              <td className="py-3 px-4">{formatCurrency(house.allocated)}</td>
              <td className="py-3 px-4 text-blue-400">
                {formatCurrency(house.utilized)}
              </td>
              <td className="py-3 px-4 text-green-400">
                {formatCurrency(house.allocated - house.utilized)}
              </td>
              <td className="py-3 px-4 font-semibold">
                {formatCurrency(house.revenue)}
              </td>
              {/* <td className="py-3 px-4">{formatCurrency(house.payouts)}</td> */}
              <td className="py-3 px-4 text-sm text-gray-400">
                {formatDate(house.createdAt)}
              </td>
              <td className="py-3 px-4">
                <Eye
                  size={18}
                  className="text-gray-400 hover:text-gray-200 cursor-pointer"
                  onClick={() => console.log("View details")}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MediaHouseAloocationTable;
