"use client";

import { RootState } from "@/lib/store";
import { sidebarLinks, UserRole } from "@/utils/utils";
import {
  ChevronDown,
  ChevronRight,
  CreditCard,
  DollarSign,
  Gift,
  Radio,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

function SideNavigation() {
  const activePath = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const tokenUser = useSelector((state: RootState) => state.auth.tokenuser);
  const links = [
    {
      name: "Dashboard",
      path: `/show/${tokenUser?.show}/dashboard`,
      icon: <TrendingUp />,
    },
    { name: "Team", path: `/show/${tokenUser?.show}/team`, icon: <Users /> },
    {
      name: "Promotions",
      path: `/show/${tokenUser?.show}/promotions`,
      icon: <Gift />,
    },
    {
      name: "Commissions",
      path: `/show/${tokenUser?.show}/commissions`,
      icon: <DollarSign />,
    },
    {
      name: "Transactions",
      path: `/show/${tokenUser?.show}/transactions`,
      icon: <CreditCard />,
    },
    {
      name: "Winners",
      path: `/show/${tokenUser?.show}/winners`,
      icon: <Trophy />,
    },
  ];
  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };
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
        {tokenUser &&
          tokenUser.role === UserRole.ADMIN &&
          sidebarLinks.map(({ label, path, icon: Icon, children }) => {
            const isActive = path === activePath || activePath.startsWith(path);
            const isOpen = openDropdown === label;

            if (children) {
              return (
                <li key={label}>
                  <button
                    onClick={() => toggleDropdown(label)}
                    className={`flex justify-between items-center w-full text-gray-100 px-2 py-2 rounded-lg ${
                      isActive ? "bg-gray-700/50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon size={22} />
                      <span>{label}</span>
                    </div>
                    {isOpen ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )}
                  </button>
                  {isOpen && (
                    <ul className="pl-8 mt-1 space-y-1">
                      {children.map((child) => (
                        <li key={child.path}>
                          <Link
                            href={child.path}
                            className={`block text-gray-300 hover:text-white px-2 py-1 rounded ${
                              activePath === child.path ? "bg-gray-700/70" : ""
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }

            // Non-dropdown link
            return (
              <li key={path}>
                <Link
                  href={path}
                  className={`px-2 flex space-x-2 items-center text-gray-100 py-2 rounded-lg ${
                    path === activePath ? "bg-gray-700/50" : ""
                  }`}
                >
                  <Icon size={22} />
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}

        {tokenUser &&
          tokenUser.role === UserRole.PRESENTER &&
          links.map(({ name, path, icon }) => {
            const isActive = path === activePath;
            return (
              <li key={path}>
                <Link
                  href={path}
                  className={`px-2 flex space-x-2 items-center text-gray-100 py-2 rounded-lg ${
                    isActive ? "bg-gray-700/50" : ""
                  }`}
                >
                  {icon}
                  <span>{name}</span>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default SideNavigation;
