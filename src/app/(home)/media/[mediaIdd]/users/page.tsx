import MediaUsersParent from "@/components/media-house/media-users-parent";
import { Plus, Users } from "lucide-react";

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
          <button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            Create User
          </button>
        </div>
      </div>

      {/* users */}
      <MediaUsersParent />
    </div>
  );
}

export default UsersPage;
