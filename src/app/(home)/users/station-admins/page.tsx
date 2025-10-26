import NewUserModal from "@/components/users/new-user-modal"
import UserList from "@/components/users/user-list"

function StationAdminPage() {
    return (
        <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg text-gray-500 font-medium">
            Station Admins Management
          </h1>
          <NewUserModal path="new-station-admin" page="station" />
        </div>
        <UserList page="station-admins" />
      </div>
    )
}

export default StationAdminPage
