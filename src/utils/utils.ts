import { House, Radio, Tv, Users } from "lucide-react";

export const isClient = typeof window !== "undefined";

export enum UserRole {
  ADMIN = "admin",
  MEDIA_HOUSE = "media-house",
  STATION_ADMIN = "station-admin",
  PRESENTER = "presenter",
}

export const sidebarLinks = [
  {
    label: "Home",
    path: "/",
    icon: House,
  },
  {
    label: "Stations",
    path: "/stations",
    icon: Radio,
  },
  {
    label: "Shows",
    path: "/shows",
    icon: Tv,
  },
  {
    label: "Users",
    path: "/users",
    icon: Users,
    children: [
      { label: "Summary", path: "/users" },
      { label: "Media House Admins", path: "/users/media-house-admins" },
      { label: "Station Admins", path: "/users/station-admins" },
      { label: "Show Presenters", path: "/users/show-presenters" },
    ],
  },
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
    month: 15.3,
  },
};

export const dailyRevenueData = [
  { date: "Mon", revenue: 10200 },
  { date: "Tue", revenue: 11500 },
  { date: "Wed", revenue: 9800 },
  { date: "Thu", revenue: 13200 },
  { date: "Fri", revenue: 14800 },
  { date: "Sat", revenue: 16200 },
  { date: "Sun", revenue: 12500 },
];

export const monthlyRevenueData = [
  { month: "Jan", revenue: 245000 },
  { month: "Feb", revenue: 267000 },
  { month: "Mar", revenue: 289000 },
  { month: "Apr", revenue: 312000 },
  { month: "May", revenue: 298000 },
  { month: "Jun", revenue: 287500 },
];

export const recentWinners = [
  {
    id: 1,
    prize: "Cash Prize",
    reference: "REF-2024-001",
    station: "Radio Wave FM",
    show: "Morning Drive",
    amount: 5000,
    date: "2025-10-07",
  },
  {
    id: 2,
    prize: "VIP Concert Tickets",
    reference: "REF-2024-002",
    station: "City Beats",
    show: "Afternoon Mix",
    amount: 2500,
    date: "2025-10-07",
  },
  {
    id: 3,
    prize: "Shopping Voucher",
    reference: "REF-2024-003",
    station: "Classic Hits",
    show: "Evening Show",
    amount: 1000,
    date: "2025-10-06",
  },
  {
    id: 4,
    prize: "Tech Bundle",
    reference: "REF-2024-004",
    station: "Radio Wave FM",
    show: "Weekend Special",
    amount: 3500,
    date: "2025-10-06",
  },
  {
    id: 5,
    prize: "Travel Package",
    reference: "REF-2024-005",
    station: "City Beats",
    show: "Prime Time",
    amount: 7500,
    date: "2025-10-05",
  },
];

export const insightCards = {
  activeStations: 12,
  activeShows: 47,
  topShow: "Morning Drive",
  topStation: "Radio Wave FM",
};

export const growthData = [
  { date: 'Week 1', mediaHouse: 20, stationAdmins: 58, presenters: 950 },
  { date: 'Week 2', mediaHouse: 21, stationAdmins: 60, presenters: 1020 },
  { date: 'Week 3', mediaHouse: 22, stationAdmins: 62, presenters: 1095 },
  { date: 'Week 4', mediaHouse: 23, stationAdmins: 64, presenters: 1150 },
  { date: 'Week 5', mediaHouse: 24, stationAdmins: 65, presenters: 1191 }
];

export const activityData: ActivityItemType[] = [
  { id: 1, name: 'John Mwangi', action: 'Joined', time: '2 mins ago', role: 'Presenter', color: '#10b981' },
  { id: 2, name: 'Jane Otieno', action: 'Updated show', time: '10 mins ago', role: 'Station Admin', color: '#3b82f6' },
  { id: 3, name: 'Radio Star FM Admin', action: 'Added new station', time: '1 hr ago', role: 'Media House Admin', color: '#8b5cf6' },
  { id: 4, name: 'Peter Kamau', action: 'Logged in', time: '2 hrs ago', role: 'Presenter', color: '#10b981' },
  { id: 5, name: 'Sarah Wanjiru', action: 'Created show', time: '3 hrs ago', role: 'Presenter', color: '#10b981' },
  { id: 6, name: 'David Omondi', action: 'Updated profile', time: '4 hrs ago', role: 'Station Admin', color: '#3b82f6' },
  { id: 7, name: 'Grace Akinyi', action: 'Logged in', time: '5 hrs ago', role: 'Presenter', color: '#10b981' },
  { id: 8, name: 'Metro FM Admin', action: 'Invited user', time: '6 hrs ago', role: 'Media House Admin', color: '#8b5cf6' }
];