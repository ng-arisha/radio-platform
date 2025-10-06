import { EyeIcon, Power, Trash2Icon } from "lucide-react";
import Link from "next/link";
import EditStationModal from "./edit-station-modal";

function StationTable({ stations }: { stations: StationType[] }) {
  return (
    <div className="overflow-x-auto rounded-box border border-gray-800 bg-gray-900/80">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className="text-gray-400 uppercase font-normal">#</th>
            <th className="text-gray-400 uppercase font-normal">
              Station Name
            </th>
            <th className="text-gray-400 uppercase font-normal">Address</th>
            <th className="text-gray-400 uppercase font-normal">Frequency</th>
            <th className="text-gray-400 uppercase font-normal">Status</th>
            <th className="text-gray-400 uppercase font-normal">Created At</th>
            <th className="text-gray-400 uppercase font-normal">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {stations.map((station, index) => (
            <tr key={station._id}>
              <th>{index + 1}</th>
              <td>{station.name}</td>
              <td>{station.address}</td>
              <td>{station.frequency}</td>
              <td>
                {station.enabled ? (
                  <p className="py-1 px-2 rounded-full bg-green-500/30 text-green-500 flex justify-center items-center w-fit">
                    <Power className="mr-1" size={16} />
                    <span>Enabled</span>
                  </p>
                ) : (
                  <p className="py-1 px-2 rounded-full bg-red-500/30 text-red-500 flex justify-center items-center w-fit">
                    <Power className="mr-1" size={16} />
                    <span>Disabled</span>
                  </p>
                )}
              </td>
              <td>{new Date(station._creationTime).toLocaleDateString()}</td>
              <td className="flex space-x-1 items-center">
                <EditStationModal station={station} />
                <Link href={`/stations/${station._id}`} className="p-2 cursor-pointer text-gray-500 rounded-md">
                    <EyeIcon className="" size={16} />
                </Link>
                <button className="p-2 cursor-pointer text-red-500 rounded-md">
                    <Trash2Icon className="" size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StationTable;
