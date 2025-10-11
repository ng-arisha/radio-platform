"use client";

import { AppDispatch, RootState } from "@/lib/store";
import { getMediaHouseUsers } from "@/lib/users/users";
import { SunIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserTable from "./user-table";

function UserList() {
    const loading = useSelector((state:RootState)=>state.users.loading);
    const mediahouseUsers = useSelector((state:RootState)=>state.users.mediahouseUsers);
    const dispatch =useDispatch<AppDispatch>();

    useEffect(()=>{
        dispatch(getMediaHouseUsers())
    },[])
    return (
        <div>
      {loading === 'pending' ? (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <SunIcon className="animate-spin text-gray-100" size={24} />
          <p>Loaing users...</p>
        </div>
      ) : mediahouseUsers.length === 0 ? (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <p className="text-red-500">You have not created any media house adminstrator</p>
        </div>
      ) : (
       
        <UserTable users={mediahouseUsers} />
      )}
    </div>
    )
}

export default UserList
