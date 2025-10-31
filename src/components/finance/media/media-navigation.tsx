"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function MediaNavigation({ mediaId }: { mediaId: string }) {
  const mediaLinks = [
    {
      label: "Dashboard",
      href: `/media/${mediaId}/dashboard`,
    },
    {
      label: "Users",
      href: `/media/${mediaId}/users`,
    },
    {
      label: "Stations",
      href: `/media/${mediaId}/stations`,
    },
    {
      label: "Shows",
      href: `/media/${mediaId}/shows`,
    },
    {
      label: "Finance",
      href: `/media/${mediaId}/finance`,
    },
    {
      label: "Commissions",
      href: `/media/${mediaId}/commission`,
    },
    {
      label: "Transactions",
      href: `/media/${mediaId}/transactions`,
    },
    {
      label: "Reports",
      href: `/media/${mediaId}/reports`,
    },
    {
      label: "Settings",
      href: `/media/${mediaId}/settings`,
    },
  ];
  const path = usePathname();
  return (
    <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1 border border-gray-800/80">
      {mediaLinks.map((link) => (
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

export default MediaNavigation;
