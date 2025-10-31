"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

function StationNavigation() {
  const params = useParams<{ stationId: string }>();
  const stationLinks = [
    {
      label: "Dashboard",
      href: `/stations/${params.stationId}/dashboard`,
    },
    {
      label: "Shows",
      href: `/stations/${params.stationId}/shows`,
    },
    {
      label: "Presenters",
      href: `/stations/${params.stationId}/presenters`,
    },
    {
      label: "Promotions",
      href: `/stations/${params.stationId}/promotions`,
    },
    {
      label: "Finance",
      href: `/stations/${params.stationId}/finance`,
    },
    {
      label: "Transactions",
      href: `/stations/${params.stationId}/transactions`,
    },
    {
      label: "Commissions",
      href: `/stations/${params.stationId}/commission`,
    },
    {
      label: "Settings",
      href: `/stations/${params.stationId}/settings`,
    },
  ];

  const path = usePathname();

  return (
    <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1 border border-gray-800/80">
      {stationLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            path === link.href
              ? "bg-orange-600 text-white"
              : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export default StationNavigation;
