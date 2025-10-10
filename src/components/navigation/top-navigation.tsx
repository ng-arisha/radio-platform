import { MenuIcon } from "lucide-react";

function TopNavigation() {
  return (
    <div className="navbar bg-gray-900/90 shadow-sm">
      <div className="flex-1">
      <label
          htmlFor="my-drawer-2"
          className="cursor-pointer text-gray-400 drawer-button lg:hidden"
        >
        <MenuIcon size={20} />
        </label>
        {/* <a className="cursor-pointer text-gray-500 text-xl">TRN</a> */}

      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          
          <li>
          {/* <UserButton/> */}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TopNavigation;
