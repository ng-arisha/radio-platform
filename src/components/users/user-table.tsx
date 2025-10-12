import { BatteryLow, Power, Trash2 } from "lucide-react";
import UserDetailsModal from "./user-details-modal";

function UserTable({ users }: { users: UserType[] }) {
  return (
    <div className="overflow-x-auto rounded-box border border-gray-800 bg-gray-900/80">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className="text-gray-400 uppercase font-normal">#</th>
            <th className="text-gray-400 uppercase font-normal">Full Name</th>
            <th className="text-gray-400 uppercase font-normal">Email</th>
            <th className="text-gray-400 uppercase font-normal">
              Phone Number
            </th>
            <th className="text-gray-400 uppercase font-normal">Status</th>
            <th className="text-gray-400 uppercase font-normal">Created At</th>
            <th className="text-gray-400 uppercase font-normal">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {users.map((user, index) => (
            <tr key={user._id}>
              <th>{index + 1}</th>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>
                {user.status === "pending" ? (
                  <p className="py-1 px-2 rounded-full bg-yellow-500/30 text-yellow-500 flex justify-center items-center w-fit">
                    <BatteryLow className="mr-1" size={16} />
                    <span>Pending</span>
                  </p>
                ) : user.status === "inactive" ? (
                  <p className="py-1 px-2 rounded-full bg-red-500/30 text-red-500 flex justify-center items-center w-fit">
                    <Power className="mr-1" size={16} />
                    <span>Inactive</span>
                  </p>
                ) : (
                  <p className="py-1 px-2 rounded-full bg-red-500/30 text-red-500 flex justify-center items-center w-fit">
                    <Power className="mr-1" size={16} />
                    <span>Active</span>
                  </p>
                )}
              </td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td className="flex space-x-1 items-center">
              <UserDetailsModal user={user} action="view" />
              <UserDetailsModal user={user} action="edit" />
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

export default UserTable;
