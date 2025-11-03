"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

function ShowNavigation() {
  const params = useParams<{ showId: string }>();
  const path = usePathname();
  const showLinks = [
    {
      name: "Dashboard",
      path: `/shows/${params.showId}/dashboard`,
    },
    {
      name: "Team Members",
      path: `/shows/${params.showId}/team`,
    },
    {
      name: "Promotions",
      path: `/shows/${params.showId}/promotions`,
    },
    {
      name: "Commissions",
      path: `/shows/${params.showId}/commissions`,
    },
    {
      name: "Transactions",
      path: `/shows/${params.showId}/transactions`,
    },
    {
      name: "Winners",
      path: `/shows/${params.showId}/winners`,
    },
  ];
  return (
    <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1 border border-gray-800/80">
      {showLinks.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            path === link.path
              ? "bg-orange-600 text-white"
              : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}

export default ShowNavigation;
