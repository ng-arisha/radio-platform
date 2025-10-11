import NewUserModal from "@/components/users/new-user-modal";
import UserList from "@/components/users/user-list";

function MediaHouseAdmins() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg text-gray-500 font-medium">
          Media House Admins Management
        </h1>
        <NewUserModal path="media-user" />
      </div>
      <UserList page="media-house-admins" />
    </div>
  );
}

export default MediaHouseAdmins;
