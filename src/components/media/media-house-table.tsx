import { Edit, Eye, Power, Trash2 } from "lucide-react";

function MediaHouseTable({ mediaHouses }: { mediaHouses: MediaHouseType[] }) {
  return (
    <div className="overflow-x-auto rounded-box border border-gray-800 bg-gray-900/80">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className="text-gray-400 uppercase font-normal">#</th>
            <th className="text-gray-400 uppercase font-normal">Name</th>
            <th className="text-gray-400 uppercase font-normal">Address</th>
            <th className="text-gray-400 uppercase font-normal">
              Adminstrator
            </th>
            <th className="text-gray-400 uppercase font-normal">Status</th>
            <th className="text-gray-400 uppercase font-normal">Created At</th>
            <th className="text-gray-400 uppercase font-normal">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {mediaHouses.map((media, index) => (
            <tr key={media._id}>
              <th>{index + 1}</th>
              <td>{media.name}</td>
              <td>{media.address}</td>
              <td>{media.user.fullName}</td>
              <td>
                {media.status === "deleted" ? (
                  <p className="py-1 px-2 rounded-full bg-orange-700/30 text-orange-700 flex justify-center items-center w-fit">
                    <Trash2 className="mr-1" size={16} />
                    <span>Deleted</span>
                  </p>
                ) : media.status === "inactive" ? (
                  <p className="py-1 px-2 rounded-full bg-red-500/30 text-red-500 flex justify-center items-center w-fit">
                    <Power className="mr-1" size={16} />
                    <span>Inactive</span>
                  </p>
                ) : (
                  <p className="py-1 px-2 rounded-full bg-green-500/30 text-green-500 flex justify-center items-center w-fit">
                    <Power className="mr-1" size={16} />
                    <span>Active</span>
                  </p>
                )}
              </td>
              <td>{new Date(media.createdAt).toLocaleDateString()}</td>
              <td className="flex space-x-1 items-center">
                <button
                  type="button"
                  className="p-2 cursor-pointer text-green-500 mr-2 rounded-md"
                >
                  <Eye className="" size={16} />
                </button>
                <button
                  type="button"
                  className="p-2 cursor-pointer text-green-500 mr-2 rounded-md"
                >
                  <Edit className="" size={16} />
                </button>
                <button
                  type="button"
                  className="p-2 cursor-pointer text-red-500 mr-2 rounded-md"
                >
                  <Trash2 className="" size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MediaHouseTable;
