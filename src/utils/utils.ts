import { House, Radio, Tv, Users } from "lucide-react";



export const isClient = typeof window !== "undefined";

export enum UserRole {
  ADMIN = 'admin',
  MEDIA_HOUSE = 'media-house',
  STATION_ADMIN = 'station-admin',
  PRESENTER = 'presenter',
}


export const sidebarLinks = [
    {
        label:"Home",
        path:"/",
        icon:House,
        
    },
    {
        label:"Stations",
        path:"/stations",
        icon:Radio
    },
    {
        label:"Shows",
        path:"/shows",
        icon:Tv
    },
    {
      label:"Users",
      path:"/users",
      icon:Users
  }
];

export const kpiData = {
    revenueToday: 12500,
    revenueYesterday: 11200,
    currentWeek: 78400,
    lastWeek: 72100,
    currentMonth: 287500,
    totalRevenue: 1245300,
    percentages: {
      today: 11.6,
      week: 8.7,
      month: 15.3
    }
  };

  export const dailyRevenueData = [
    { date: 'Mon', revenue: 10200 },
    { date: 'Tue', revenue: 11500 },
    { date: 'Wed', revenue: 9800 },
    { date: 'Thu', revenue: 13200 },
    { date: 'Fri', revenue: 14800 },
    { date: 'Sat', revenue: 16200 },
    { date: 'Sun', revenue: 12500 }
  ];

  export const monthlyRevenueData = [
    { month: 'Jan', revenue: 245000 },
    { month: 'Feb', revenue: 267000 },
    { month: 'Mar', revenue: 289000 },
    { month: 'Apr', revenue: 312000 },
    { month: 'May', revenue: 298000 },
    { month: 'Jun', revenue: 287500 }
  ];

  export const recentWinners = [
    { id: 1, prize: 'Cash Prize', reference: 'REF-2024-001', station: 'Radio Wave FM', show: 'Morning Drive', amount: 5000, date: '2025-10-07' },
    { id: 2, prize: 'VIP Concert Tickets', reference: 'REF-2024-002', station: 'City Beats', show: 'Afternoon Mix', amount: 2500, date: '2025-10-07' },
    { id: 3, prize: 'Shopping Voucher', reference: 'REF-2024-003', station: 'Classic Hits', show: 'Evening Show', amount: 1000, date: '2025-10-06' },
    { id: 4, prize: 'Tech Bundle', reference: 'REF-2024-004', station: 'Radio Wave FM', show: 'Weekend Special', amount: 3500, date: '2025-10-06' },
    { id: 5, prize: 'Travel Package', reference: 'REF-2024-005', station: 'City Beats', show: 'Prime Time', amount: 7500, date: '2025-10-05' }
  ];

  export const insightCards = {
    activeStations: 12,
    activeShows: 47,
    topShow: 'Morning Drive',
    topStation: 'Radio Wave FM'
  };