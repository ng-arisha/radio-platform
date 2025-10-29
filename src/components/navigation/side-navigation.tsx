"use client";

import { getAllMediaHouses } from "@/lib/media/media";
import { getAllShows } from "@/lib/shows/shows";
import { getAllStations } from "@/lib/stations/stations";
import { AppDispatch, RootState } from "@/lib/store";
import { sidebarLinks, UserRole } from "@/utils/utils";
import {
  ChevronDown,
  ChevronRight,
  CreditCard,
  DollarSign,
  Gift,
  Home,
  Radio,
  Receipt,
  ReceiptCent,
  Settings,
  TrendingUp,
  Trophy,
  Tv,
  Users,
  Wallet,
  Wallet2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function SideNavigation() {
  const activePath = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const tokenUser = useSelector((state: RootState) => state.auth.tokenuser);
  const mediaHouses = useSelector(
    (state: RootState) => state.media.mediaHouses
  );

  const stations = useSelector(
    (state: RootState) => state.stations.allStations
  );
  const shows = useSelector((state: RootState) => state.shows.allShows);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllMediaHouses());
    dispatch(getAllStations());
    dispatch(getAllShows());
  }, []);
  // add media house links to the admin links in the children section of media houses
  const masterLinks =
    mediaHouses?.map((house) => ({
      label: house.name,
      path: `/media-houses/media/${house._id}`, // or house.id depending on your schema
    })) || [];
  const adminStationLinks =
    stations?.map((station) => ({
      label: station.name,
      path: `/stations/${station._id}/dashboard`, // or house.id depending on your schema
    })) || [];

  const adminShowLinks =
    shows?.map((show) => ({
      label: show.name,
      path: `/shows/${show._id}/dashboard`, // or house.id depending on your schema
    })) || [];
  const newSidebarLinks = sidebarLinks.map((link) => {
    if (link.label === "Media Houses") {
      const [first, ...rest] = link.children || [];
      const newChildren = [first, ...masterLinks, ...rest];
      return { ...link, children: newChildren };
    }
    return link;
  });

  const adminSidebarLinks = newSidebarLinks.map((link) => {
    if (link.label === "Stations") {
      const [first, ...rest] = link.children || [];
      const newChildren = [first, ...adminStationLinks, ...rest];
      return { ...link, children: newChildren };
    }
    return link;
  });

  const newAdminSideBarLinksWithShows = adminSidebarLinks.map((link) => {
    if (link.label === "Shows") {
      const [first, ...rest] = link.children || [];
      const newChildren = [first, ...adminShowLinks, ...rest];
      return { ...link, children: newChildren };
    }
    return link;
  });

  const mediaHouseLinks = [
    {
      name: "Dashboard",
      path: `/media/${tokenUser?.media}/dashboard`,
      icon: <Home />,
    },
    {
      name: "Users",
      path: `/media/${tokenUser?.media}/users`,
      icon: <Users />,
    },
    {
      name: "Stations",
      path: `/media/${tokenUser?.media}/stations`,
      icon: <Radio />,
    },
    {
      name: "Shows Management",
      path: `/media/${tokenUser?.media}/shows`,
      icon: <Tv />,
    },
    {
      name: "Finance & Budget",
      path: `/media/${tokenUser?.media}/finance`,
      icon: <Gift />,
    },
    {
      name: "Commissions",
      path: `/media/${tokenUser?.media}/commission`,
      icon: <Wallet2 />,
    },

    {
      name: "Transactions",
      path: `/media/${tokenUser?.media}/transactions`,
      icon: <Receipt />,
    },
    {
      name: "Reports",
      path: `/media/${tokenUser?.media}/reports`,
      icon: <ReceiptCent />,
    },
    {
      name: "Settings",
      path: `/media/${tokenUser?.media}/settings`,
      icon: <Settings />,
    },
  ];
  const stationLinks = [
    {
      name: "Dashboard",
      path: `/stations/${tokenUser?.station}/dashboard`,
      icon: <Home />,
    },
    {
      name: "Shows Management",
      path: `/stations/${tokenUser?.station}/shows`,
      icon: <Radio />,
    },
    {
      name: "Presenters",
      path: `/stations/${tokenUser?.station}/presenters`,
      icon: <Users />,
    },
    {
      name: "Promotions",
      path: `/stations/${tokenUser?.station}/promotions`,
      icon: <Gift />,
    },
    {
      name: "Finance",
      path: `/stations/${tokenUser?.station}/finance`,
      icon: <Wallet />,
    },
    {
      name: "Transactions",
      path: `/stations/${tokenUser?.station}/transactions`,
      icon: <Receipt />,
    },
    {
      name: "Commission",
      path: `/stations/${tokenUser?.station}/commission`,
      icon: <Wallet />,
    },
    {
      name: "Settings",
      path: `/stations/${tokenUser?.station}/settings`,
      icon: <Settings />,
    },
  ];
  const showLinks = [
    {
      name: "Dashboard",
      path: `/shows/${tokenUser?.show}/dashboard`,
      icon: <TrendingUp />,
    },
    {
      name: "Team Members",
      path: `/shows/${tokenUser?.show}/team`,
      icon: <Users />,
    },
    {
      name: "Promotions",
      path: `/shows/${tokenUser?.show}/promotions`,
      icon: <Gift />,
    },
    {
      name: "Commissions",
      path: `/shows/${tokenUser?.show}/commissions`,
      icon: <DollarSign />,
    },
    {
      name: "Transactions",
      path: `/shows/${tokenUser?.show}/transactions`,
      icon: <CreditCard />,
    },
    {
      name: "Winners",
      path: `/shows/${tokenUser?.show}/winners`,
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
          newAdminSideBarLinksWithShows.map(
            ({ label, path, icon: Icon, children }) => {
              const isActive =
                path === activePath || activePath.startsWith(path);
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
                                activePath === child.path
                                  ? "bg-gray-700/70"
                                  : ""
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
            }
          )}

        {tokenUser &&
          tokenUser.role === UserRole.PRESENTER &&
          showLinks.map(({ name, path, icon }) => {
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

        {tokenUser &&
          tokenUser.role === UserRole.STATION_ADMIN &&
          stationLinks.map(({ name, path, icon }) => {
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

        {tokenUser &&
          tokenUser.role === UserRole.MEDIA_HOUSE &&
          mediaHouseLinks.map(({ name, path, icon }, index) => {
            const isActive = path === activePath;
            return (
              <li key={index}>
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
