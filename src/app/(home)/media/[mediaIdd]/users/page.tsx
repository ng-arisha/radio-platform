import MediaUsersParent from "@/components/media-house/media-users-parent";
import NewUserModal from "@/components/users/new-user-modal";
import { Users } from "lucide-react";

function UsersPage() {
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 p-3 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-medium">Users Management</h1>
              <p className="text-gray-400 text-sm">
                Manage station admins and presenters
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
          <NewUserModal path="new-station-admin" page="station" />
          <NewUserModal path="new-presenter" page="show" />
          </div>
        </div>
      </div>

      {/* users */}
      <MediaUsersParent />
    </div>
  );
}

export default UsersPage;
