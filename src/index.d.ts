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