"use client";

import { logout } from "@/lib/auth/auth";
import { AppDispatch } from "@/lib/store";
import { LogOut, MenuIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

function TopNavigation() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  }
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
          <span onClick={handleLogout}>
            <LogOut size={20} className="text-gray-400 cursor-pointer" />
          </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TopNavigation;
