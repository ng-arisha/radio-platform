import NewUserModal from "@/components/users/new-user-modal"
import UserList from "@/components/users/user-list"

function ShowPresentersPage() {
    return (
        <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg text-gray-500 font-medium">
            Show Presenters Management
          </h1>
          <NewUserModal path="new-presenter" />
        </div>
        <UserList page="presenters" />
      </div>
    )
}

export default ShowPresentersPage
