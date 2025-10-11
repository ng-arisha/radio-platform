import NewUserModal from "@/components/users/new-user-modal";
import UserList from "@/components/users/user-list";

function UsersPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg text-gray-500 font-medium">
          Users dashboard & Management
        </h1>
        <NewUserModal />
      </div>
      <UserList />
    </div>
  );
}

export default UsersPage;
