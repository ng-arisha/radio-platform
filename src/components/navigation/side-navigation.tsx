"use client";

import { sidebarLinks } from "@/utils/utils";
import { Radio } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideNavigation() {
  const activePath = usePathname();
  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-gray-900/90 text-base-content min-h-full w-72 p-4">
      <li className="flex justify-center items-center mb-4">
        <p className="text-gray-100 text-xl py-4">
            <Radio />
            <span>TRN</span>
        </p>
        </li>
        {/* Sidebar content here */}
        {sidebarLinks.map(({ label, path, icon: Icon }) => (
          <li key={path} className="">
            <Link
              href={path}
              className={`px-2 flex space-x-2 items-center text-gray-100 ${path === activePath ? "border border-gray-300/50" : ""}`}
            >
              <Icon size={24} />
              <span>{label}</span>
            </Link>
          </li>
        ))}
       
      </ul>
    </div>
  );
}

export default SideNavigation;
