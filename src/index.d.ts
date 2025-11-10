declare type JwtPayloadType = {
  sub: string;
  email: string;
  phoneNumber: string;
  show?: string;
  station?: string;
  media?: string;
  iat: number;
  exp: number;
  role: string;
};

declare type MediaHouseType = {
  _id: string;
  name: string;
  address: string;
  status: string;
  createdAt: string;
  user: UserType;
};

declare type UserType = {
  _id: string;
  fullName: string;
  email: string;
  status: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt?: string;
  showName?: string;
  station?: StationType;
  show?: ShowType;
};
declare type ActivityItemType = {
  id: number;
  name: string;
  action: string;
  time: string;
  role: string;
  color: string;
};

declare type TabsType = {
  title: string;
};

declare type StationType = {
  _id: string;
  name: string;
  address: string;
  frequency: string;
  code:string
  status: string;
  createdAt: string;
  user: UserType;
  shows: ShowsType[];
  media: MediaHouseType;
};

declare type MasterSummaryType = {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down";
  icon: string;
  color: string;
};

declare type FinanceAllocationsType = {
  _id: string;
  allocated: number;
  utilized: number;
  revenue: number;
  status: string;
  createdAt: string;
  media?: MediaHouseType;
  station?: StationType;
};

declare type MediaHousePerformanceType = {
  mediaHouse: string;
  allocated: number;
  utilized: number;
  revenue: number;
};

declare type ShowType = {
  _id: string;
  name: string;
  startTime: string;
  endTime: string;
  jackpotEnabled: boolean;
  status: string;
  createdAt: string;
  station: StationType;
  revenue?: number;
  users: string[];
  activeDays: string[];
};

declare type PresenterType = {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  status: string;
  createdAt: string;
  show: ShowType;
};

declare type PromotionType = {
  _id: string;
  name: string;
  amount: number;
  status: string;
  type?: string;
  show: ShowType;
  spent: number;
  numberOfBeneficiaries: number;
  beneficiaries:string[];
  expiryDate: string;
  createdAt: string;
};

declare type TransactionsType = {
  _id: string;
  amount: number;
  type: string;
  username: string;
  phoneNumber: string;
  createdAt: string;
  transactionCode: string;
  show?: ShowType;
  code:string;
  receipt:string;
  operator:string
};

declare type AllocationType = {
  _id: string;
  allocated: number;
  utilized: number;
  revenue: number;
  status: string;
  type: string;
  show: ShowType;
  createdAt: string;
};
declare type StationUmmaryType = {
  id: string;
  name: string;
  frequency: string;
  admin: string;
  revenue: number;
  budget: number;
  status: string;
  activeShows: number;
  utilization: number;
  address: string;
  contact: string;
  email: string;
};

declare type MediaStationFinancedataType = {
  id: string;
  station: string;
  allocated: number;
  utilized: number;
  revenue: number;
  remaining: number;
  lastUpdated: string;
  status: string;
  financeId:string
};

declare type MasterCommissionType = {
  platformTotalRevenue: number;
  platformTotalCommission: number;
  mediaHouses:MediaHouseCommissionType[];
}


declare type MediaHouseCommissionType = {
  mediaHouseId: string;
  mediaHouseName: string;
  totalRevenue: number;
  totalCommission: number;
  rate: number;
  commissionId:string
}

declare type PaginatatedTxnsType = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: TransactionsType[];
  
};

declare type MediaHousesCommissionType = {
  mediaHouseId: string;
  mediaHouseName: string;
  totalRevenue:number;
  totalCommission:number;
  stations:StationsCommissionType[]
}


declare type StationsCommissionType={
  stationName:string;
  totalRevenue:number;
  commissionRate:number;
  commissionId:string;
  totalCommission:number;
  stationId:string
}

declare type StationLevelCommissionType = {
  stationId:string;
  stationName:string;
  totalRevenue:number;
  totalCommission:number;
  shows:ShowCommissionType[]
}

declare type ShowCommissionType = {
  showId:string;
  showName:string;
  totalRevenue:number;
  commissionId:string
  commissionRate:number;
  totalCommission:number
}

declare type DetailedMasterTransactionsType = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: {
    date:string;
    mediaHouse:string;
    station:string;
    paybill:string;
    deposits:number;
    payouts:number;
    net:number;
    participants:number
  }[];
}