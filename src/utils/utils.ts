import {
  AwardIcon,
  DollarSign,
  Gift,
  House,
  Info,
  NewspaperIcon,
  Radio,
  RadioTower,
  Receipt,
  Settings,
  TrendingUp,
  Tv,
  Users,
  Wallet,
} from "lucide-react";

export const isClient = typeof window !== "undefined";

export enum UserRole {
  ADMIN = "admin",
  MEDIA_HOUSE = "media-house",
  STATION_ADMIN = "station-admin",
  PRESENTER = "presenter",
}
export enum PromoType {
  FIXED_SHOW_WINNING = "fixed_show_winning",
  SHOW_GIVEAWAY = "show_giveaway",
}

export const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const timeFilters = [
  {
    label: "30 Minutes",
    value: "30m",
  },
  {
    label: "1 hr",
    value: "1h",
  },
  {
    label: "2 hrs",
    value: "2h",
  },
  {
    label: "6 hrs",
    value: "6h",
  },
  {
    label: "Today",
    value: "today",
  },
  {
    label: "Yesterday",
    value: "yesterday",
  },
  {
    label: "This Week",
    value: "thisWeek",
  },
  {
    label: "This Month",
    value: "thisMonth",
  },
];

export const transactionsType = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Revenue",
    value: "revenue",
  },
  {
    label: "Expense",
    value: "expense",
  },
  {
    label: "Bonus",
    value: "bonus",
  },
];
export const timeRanges = [
  {
    label: "Daily",
    value: "daily",
  },
  {
    label: "Weekly",
    value: "weekly",
  },
  {
    label: "Monthly",
    value: "monthly",
  },
  {
    label: "Yearly",
    value: "yearly",
  },
];
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-TZ", {
    style: "currency",
    currency: "TZS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function getCurrentDateTime() {
  const now = new Date();

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = now.toLocaleDateString("en-US", dateOptions);

  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes} EAT`;

  return { formattedDate, formattedTime };
}

export function getRemainingShowTime(
  startTime: string,
  endTime: string
): string {
  const now = new Date();

  // Create full date strings for today with start and end times
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  const start = new Date(now);
  start.setHours(startHours, startMinutes, 0, 0);

  const end = new Date(now);
  end.setHours(endHours, endMinutes, 0, 0);

  // If show already ended
  if (now > end) return "Show has ended";

  // If show not started yet
  if (now < start) return "Show has not started yet";

  // Remaining time in ms
  const diffMs = end.getTime() - now.getTime();

  // Convert to readable time
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export const sidebarLinks = [
  {
    label: "Home",
    path: "/",
    icon: House,
  },

  {
    label: "Media Houses",
    path: "/media-houses",
    icon: RadioTower,
    children: [
      { label: "All", path: "/media-houses/media" },
      // { label: "Stations", path: "/media-houses/stations" },
    ],
  },
  {
    label: "Stations",
    path: "/stations",
    icon: RadioTower,
    children: [
      { label: "All", path: "/media-houses/stations" },
      // { label: "Stations", path: "/media-houses/stations" },
    ],
  },
  {
    label: "Shows",
    path: "/shows",
    icon: Tv,
    children: [
      { label: "All", path: "/media-houses/shows" },
      // { label: "Stations", path: "/media-houses/stations" },
    ],
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
  {
    label: "Promotions",
    path: "/promotions",
    icon: Gift,
  },
  {
    label: "Finance & Allocations",
    path: "/finance",
    icon: DollarSign,
  },
  {
    label: "Commission",
    path: "/commission",
    icon: Wallet,
  },
  {
    label: "Transactions",
    path: "/transactions",
    icon: Receipt,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: NewspaperIcon,
    children: [
      { label: "Revenue Reports", path: "/reports/revenue" },
      { label: "Payout Reports", path: "/reports/payouts" },
      { label: "Bonus Reports", path: "/reports/bonuses" },
    ],
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export const mediaDetailsTabs = [
  {
    title: "Overview",
    Icon: TrendingUp,
  },
  {
    title: "About",
    Icon: Info,
  },
  {
    title: "Stations",
    Icon: Radio,
  },
  {
    title: "Finance",
    Icon: AwardIcon,
  },
  // {
  //   title:"Reports",
  //   Icon: NotepadText
  // },
  // {
  //   title:"Activity Log",
  //   Icon: Activity
  // }
];

export const stationDetailsTabs = [
  {
    title: "Overview",
    Icon: TrendingUp,
  },
  {
    title: "About",
    Icon: Info,
  },
  {
    title: "Shows",
    Icon: Tv,
  },
  {
    title: "Finance",
    Icon: AwardIcon,
  },
  // {
  //   title:"Reports",
  //   Icon: NotepadText
  // },
  // {
  //   title:"Activity Log",
  //   Icon: Activity
  // }
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

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function transformToNameValueArray(
  data: {
    mediaHouse: number;
    stationAdmin: number;
    presenter: number;
    customerCare: number;
    financeOfficer: number;
  }[]
) {
  const totals: Record<string, number> = {};

  // Step 1: Compute totals for each role
  for (const week of data) {
    for (const [key, value] of Object.entries(week)) {
      if (key === "date") continue;
      totals[key] = (totals[key] || 0) + (value as number);
    }
  }

  // Step 2: Define color mapping for each role
  const roleColors: Record<string, string> = {
    mediaHouse: "#8b5cf6",
    stationAdmin: "#3b82f6",
    presenter: "#10b981",
    customerCare: "#f59e0b",
    financeOfficer: "#ef4444",
    admin: "#6b7280", // gray for admin or others
  };

  // Step 3: Transform into { name, value, color } array
  return Object.entries(totals).map(([name, value]) => ({
    name,
    value,
    color: roleColors[name] || "#6b7280", // fallback color
  }));
}
export const activityData: ActivityItemType[] = [
  {
    id: 1,
    name: "John Mwangi",
    action: "Joined",
    time: "2 mins ago",
    role: "Presenter",
    color: "#10b981",
  },
  {
    id: 2,
    name: "Jane Otieno",
    action: "Updated show",
    time: "10 mins ago",
    role: "Station Admin",
    color: "#3b82f6",
  },
  {
    id: 3,
    name: "Radio Star FM Admin",
    action: "Added new station",
    time: "1 hr ago",
    role: "Media House Admin",
    color: "#8b5cf6",
  },
  {
    id: 4,
    name: "Peter Kamau",
    action: "Logged in",
    time: "2 hrs ago",
    role: "Presenter",
    color: "#10b981",
  },
  {
    id: 5,
    name: "Sarah Wanjiru",
    action: "Created show",
    time: "3 hrs ago",
    role: "Presenter",
    color: "#10b981",
  },
  {
    id: 6,
    name: "David Omondi",
    action: "Updated profile",
    time: "4 hrs ago",
    role: "Station Admin",
    color: "#3b82f6",
  },
  {
    id: 7,
    name: "Grace Akinyi",
    action: "Logged in",
    time: "5 hrs ago",
    role: "Presenter",
    color: "#10b981",
  },
  {
    id: 8,
    name: "Metro FM Admin",
    action: "Invited user",
    time: "6 hrs ago",
    role: "Media House Admin",
    color: "#8b5cf6",
  },
];

export const mockKPIData = {
  totalRevenue: {
    value: 156800,
    change: 12.5,
    trend: "up",
    sparkline: [140, 142, 145, 150, 152, 156],
  },
  netRevenue: {
    value: 124300,
    change: 10.2,
    trend: "up",
    sparkline: [110, 115, 118, 120, 122, 124],
  },
  totalPayouts: {
    value: 18500,
    change: -5.3,
    trend: "down",
    sparkline: [22, 21, 20, 19, 19, 18],
  },
  bonusesAllocated: { value: 12, amount: 8200, change: 25, trend: "up" },
  activeStations: { value: 5, change: 0, trend: "stable" },
  pendingPayouts: { value: 23, amount: 4500, change: 15, trend: "up" },
  targetAchievement: { value: 78, target: 200000, achieved: 156800 },
};

export const mockRevenueData = [
  {
    station: "Star FM",
    gross: 45200,
    awarded: 5400,
    net: 39800,
    presenter: 3980,
    mediaHouse: 7960,
    platform: 1990,
    shows: 12,
  },
  {
    station: "Capital Radio",
    gross: 38600,
    awarded: 4200,
    net: 34400,
    presenter: 3440,
    mediaHouse: 6880,
    platform: 1720,
    shows: 10,
  },
  {
    station: "Kiss FM",
    gross: 42800,
    awarded: 4800,
    net: 38000,
    presenter: 3800,
    mediaHouse: 7600,
    platform: 1900,
    shows: 15,
  },
  {
    station: "Classic FM",
    gross: 18200,
    awarded: 1800,
    net: 16400,
    presenter: 1640,
    mediaHouse: 3280,
    platform: 820,
    shows: 8,
  },
  {
    station: "Metro FM",
    gross: 12000,
    awarded: 1300,
    net: 10700,
    presenter: 1070,
    mediaHouse: 2140,
    platform: 535,
    shows: 6,
  },
];

export const revenueData = [
  { date: "Jan", gross: 3800, net: 3400 },
  { date: "Feb", gross: 4200, net: 3800 },
  { date: "Mar", gross: 3900, net: 3500 },
  { date: "Apr", gross: 4500, net: 4100 },
  { date: "May", gross: 4800, net: 4400 },
  { date: "Jun", gross: 5200, net: 4800 },
];
