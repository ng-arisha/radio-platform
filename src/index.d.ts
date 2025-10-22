




declare type JwtPayloadType = {
    sub:string;
    email:string;
    phoneNumber:string;
    show?:string;
    station?:string;
    media?:string;
    iat: number;
    exp: number;
    role:string;
}

declare type MediaHouseType = {
    _id:string
    name:string;
    address:string;
    status:string;
    createdAt:string;
    user:UserType;
}

declare type UserType = {
    _id:string;
    fullName:string;
    email:string;
    status:string;
    phoneNumber:string;
    createdAt:string;
    showName?:string;
}
declare type ActivityItemType = {
    id: number;
    name: string;
    action: string;
    time: string;
    role: string;
    color: string;
  }


  declare type TabsType = {
    title: string;
  }

  declare type StationType = {
    _id:string;
    name:string;
    address:string;
    frequency:string;
    status:string;
    createdAt:string;
    user:UserType;
    shows:ShowsType[];
    media:MediaHouseType
  }

  declare type MasterSummaryType = {
    label: string;
    value: string;
    change:number;
    trend:'up' | 'down';
    icon: string;
    color:string;
  }

  declare type FinanceAllocationsType = {
    _id:string;
    allocated:number;
    utilized:number;
    revenue:number;
    status:string;
    createdAt:string;
    media?:MediaHouseType
    station?:StationType
  }

  declare type MediaHousePerformanceType = {
    mediaHouse: string;
    allocated: number;
    utilized: number;
    revenue: number;
  }

  declare type ShowType = {
    _id:string;
    name:string;
    code:string;
    startTime:string;
    endTime:string;
    jackpotEnabled:boolean;
    status:string;
    createdAt:string;
    station:StationType;
    dailyRevenue?:number;
    users:string[];
  }

  declare type PresenterType = {
    _id:string;
    fullName:string;
    email:string;
    phoneNumber:string;
    status:string;
    createdAt:string;
    show:ShowType
  }

  declare type PromotionType = {
    _id:string;
    name:string;
    amount:number;
    status:string;
    expiryDate:string;
    createdAt:string;
    
  }

  declare type TransactionsType = {
    _id:string;
    amount:number;
    type:string;
    username:string;
    phoneNumber:string
    createdAt:string;
    transactionCode:string;
  }

