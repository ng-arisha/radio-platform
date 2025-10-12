"use client";

import { AppDispatch, RootState } from "@/lib/store";
import {
  getMediaHouseUsers,
  getShowPresenters,
  getStationAdminUsers,
} from "@/lib/users/users";
import { SunIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserTable from "./user-table";

function UserList({ page }: { page: string }) {
  const loading = useSelector((state: RootState) => state.users.loading);
  const mediahouseUsers = useSelector(
    (state: RootState) => state.users.mediahouseUsers
  );
  const stationAdminUsers = useSelector(
    (state: RootState) => state.users.stationAdminUsers
  );
  const presenterUsers = useSelector(
    (state: RootState) => state.users.presenterUsers
  );

  const users =
    page === "media-house-admins"
      ? mediahouseUsers
      : page === "station-admins"
        ? stationAdminUsers
        : presenterUsers;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (page === "media-house-admins") {
      dispatch(getMediaHouseUsers());
    } else if (page === "station-admins") {
      dispatch(getStationAdminUsers());
    } else {
      dispatch(getShowPresenters());
    }
  }, [dispatch, page]);
  return (
    <div>
      {loading === "pending" || users === undefined ? (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <SunIcon className="animate-spin text-gray-100" size={24} />
          <p>Loading users...</p>
        </div>
      ) : users?.length === 0 ? (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <p className="text-red-500">
            {
              page === "media-house-admins"
                ? "You have not created any media house adminstrator"
                : page === "station-admins"
                  ? "No station admins found"
                  : "No show presenters found"
            }
          </p>
        </div>
      ) : (
        <UserTable users={users!} />
      )}
    </div>
  );
}

export default UserList;
