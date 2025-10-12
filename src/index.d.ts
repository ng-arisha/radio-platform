
declare type StationType = {
    _id: string;
    _creationTime: number;
    userId: string;
    name: string;
    address: string;
    frequency: string;
    enabled: boolean;
}

declare type ShowsType = {
    _id: string;
    _creationTime: number;   
    code: string;
    startTime: string;
    endTime: string;
    name: string;
    jackpotEnabled:boolean
    stationName?: string;
    stationId: string;
}

declare type JwtPayloadType = {
    sub:string;
    email:string;
    phoneNumber:string;
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