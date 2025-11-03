import UserStats from "@/components/users/user-starts";

function UsersPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl pb-2 text-gray-500 font-medium">
            Users dashboard
          </h1>
          <p>
            Monitor user distribution, trends, and activity across the platform
          </p>
        </div>
        {/* <UserActions /> */}
      </div>
      <UserStats />
    
    </div>
  );
}

export default UsersPage;
