import { AwardIcon, House, Info, Radio, RadioTower, TrendingUp, Tv, Users } from "lucide-react";


export const isClient = typeof window !== "undefined";

export enum UserRole {
  ADMIN = "admin",
  MEDIA_HOUSE = "media-house",
  STATION_ADMIN = "station-admin",
  PRESENTER = "presenter",
}
export const formatCurrency=(amount:number)=>{
  return new Intl.NumberFormat('en-TZ',{
      style:'currency',
      currency:'TZS',
      minimumFractionDigits:0,
      maximumFractionDigits:0
  }).format(amount);
}
export const formatDate =(dateString:string)=>{
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US',{
      year:'numeric',
      month:'short',
      day:'numeric',
      hour:'2-digit',
      minute:'2-digit'
  });
}

export const sidebarLinks = [
  {
    label: "Home",
    path: "/",
    icon: House,
  },
  // {
  //   label: "Stations",
  //   path: "/stations",
  //   icon: Radio,
  // },
  // {
  //   label: "Shows",
  //   path: "/shows",
  //   icon: Tv,
  // },
  {
    label: "Media Houses",
    path: "/media-houses",
    icon: RadioTower,
    children:[
      // { label: "Overview", path: "/media-houses" },
      { label: "All", path: "/media-houses/media" },
      { label: "Stations", path: "/media-houses/stations" },
      // { label: "Shows & Schedules", path: "/media-houses/shows" },
      { label: "Finance", path: "/media-houses/finance" },
      // { label: "Allocations", path: "/media-houses/allocations" },
      // { label: "Reports", path: "/media-houses/reports" },
      // { label: "Activity Log", path: "/media-houses/activity" },
      // { label: "Settings", path: "/media-houses/settings" },
    ]
  },
  {
    label: "Users",
    path: "/users",
    icon: Users,
    children: [
      { label: "Overview", path: "/users" },
      { label: "Media House Admins", path: "/users/media-house-admins" },
      { label: "Station Admins", path: "/users/station-admins" },
      { label: "Show Presenters", path: "/users/show-presenters" },
    ],
  },
];

export const mediaDetailsTabs = [
  {
    title: "Overview",
    Icon: TrendingUp
  },
  {
    title:"About",
    Icon: Info
  },
  {
    title:"Stations",
    Icon: Radio
  },
  {
    title:"Finance",
    Icon: AwardIcon
  },
  // {
  //   title:"Reports",
  //   Icon: NotepadText
  // },
  // {
  //   title:"Activity Log",
  //   Icon: Activity
  // }
]

export const stationDetailsTabs = [
  {
    title: "Overview",
    Icon: TrendingUp
  },
  {
    title:"About",
    Icon: Info
  },
  {
    title:"Shows",
    Icon: Tv
  },
  {
    title:"Finance",
    Icon: AwardIcon
  },
  // {
  //   title:"Reports",
  //   Icon: NotepadText
  // },
  // {
  //   title:"Activity Log",
  //   Icon: Activity
  // }
]

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

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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

export const mockKPIData = {
  totalRevenue: { value: 156800, change: 12.5, trend: 'up', sparkline: [140, 142, 145, 150, 152, 156] },
  netRevenue: { value: 124300, change: 10.2, trend: 'up', sparkline: [110, 115, 118, 120, 122, 124] },
  totalPayouts: { value: 18500, change: -5.3, trend: 'down', sparkline: [22, 21, 20, 19, 19, 18] },
  bonusesAllocated: { value: 12, amount: 8200, change: 25, trend: 'up' },
  activeStations: { value: 5, change: 0, trend: 'stable' },
  pendingPayouts: { value: 23, amount: 4500, change: 15, trend: 'up' },
  targetAchievement: { value: 78, target: 200000, achieved: 156800 }
};

export const mockRevenueData = [
  { station: 'Star FM', gross: 45200, awarded: 5400, net: 39800, presenter: 3980, mediaHouse: 7960, platform: 1990, shows: 12 },
  { station: 'Capital Radio', gross: 38600, awarded: 4200, net: 34400, presenter: 3440, mediaHouse: 6880, platform: 1720, shows: 10 },
  { station: 'Kiss FM', gross: 42800, awarded: 4800, net: 38000, presenter: 3800, mediaHouse: 7600, platform: 1900, shows: 15 },
  { station: 'Classic FM', gross: 18200, awarded: 1800, net: 16400, presenter: 1640, mediaHouse: 3280, platform: 820, shows: 8 },
  { station: 'Metro FM', gross: 12000, awarded: 1300, net: 10700, presenter: 1070, mediaHouse: 2140, platform: 535, shows: 6 }
];



export const revenueData = [
  { date: 'Jan', gross: 3800, net: 3400 },
  { date: 'Feb', gross: 4200, net: 3800 },
  { date: 'Mar', gross: 3900, net: 3500 },
  { date: 'Apr', gross: 4500, net: 4100 },
  { date: 'May', gross: 4800, net: 4400 },
  { date: 'Jun', gross: 5200, net: 4800 }
];