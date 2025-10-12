"use client";

import { getSingleMediaHouse } from "@/lib/media/media";
import { AppDispatch, RootState } from "@/lib/store";
import { Power, SunIcon, Trash2, UserMinusIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../shared/card";
import TextColumn from "../shared/text-column";

function MediaHouseDetails() {
  const params = useParams<{ mediaId: string }>();
  const loading = useSelector((state: RootState) => state.media.loading);
  const mediaHouse = useSelector((state: RootState) => state.media.mediaHouse);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getSingleMediaHouse({ id: params.mediaId }));
  }, [dispatch, params.mediaId]);
  return (
    <div>
      {loading === "pending" || mediaHouse === null ? (
        <div className="h-24 w-full flex flex-col justify-center items-center text-gray-200">
          <SunIcon className="animate-spin" size={24} />
        </div>
      ) : (
        <div>
          <h1 className="text-lg font-medium text-gray-500 pb-3">
            Media House Basic information
          </h1>
          <Card className="py-4 px-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <TextColumn label="Media House Name" value={mediaHouse.name} />
            <TextColumn
              label="Media House Address"
              value={mediaHouse.address}
            />
            <TextColumn
              label="Date created"
              value={new Date(mediaHouse.createdAt).toLocaleDateString()}
            />
            <div className="flex flex-col justify-start items-start">
              <h1 className="text-gray-500 font-normal">Media House Status</h1>
              {mediaHouse.status === "deleted" ? (
                <p className="py-1 px-2 rounded-full bg-orange-700/30 text-orange-700 flex justify-center items-center w-fit">
                  <Trash2 className="mr-1" size={16} />
                  <span>Deleted</span>
                </p>
              ) : mediaHouse.status === "inactive" ? (
                <p className="py-1 px-2 rounded-full bg-red-500/30 text-red-500 flex justify-center items-center w-fit">
                  <Power className="mr-1" size={16} />
                  <span>Inactive</span>
                </p>
              ) : (
                <p className="py-1 px-2 rounded-full bg-green-500/30 text-green-500 flex justify-center items-center w-fit">
                  <Power className="mr-1" size={16} />
                  <span>Active</span>
                </p>
              )}
            </div>
          </Card>
          <h1 className="text-lg font-medium text-gray-500 pb-3 pt-6">
            Media House Adminstrator information
          </h1>
          <Card className="py-4 px-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <TextColumn label="Full Name" value={mediaHouse.user.fullName} />
                <TextColumn label="Email Address" value={mediaHouse.user.email} />
                <TextColumn label="Phone Number" value={mediaHouse.user.phoneNumber} />
                <div className="flex flex-col justify-start items-start">
              <h1 className="text-gray-500 font-normal">Media House Status</h1>
              {mediaHouse.user.status === "pending" ? (
                  <p className="py-1 px-2 rounded-full bg-yellow-500/30 text-yellow-500 flex justify-center items-center w-fit">
                    <UserMinusIcon className="mr-1" size={16} />
                    <span>Pending</span>
                  </p>
                ) : mediaHouse.user.status === "inactive" ? (
                  <p className="py-1 px-2 rounded-full bg-red-500/30 text-red-500 flex justify-center items-center w-fit">
                    <Power className="mr-1" size={16} />
                    <span>Inactive</span>
                  </p>
                ) : (
                  <p className="py-1 px-2 rounded-full bg-red-500/30 text-red-500 flex justify-center items-center w-fit">
                    <Power className="mr-1" size={16} />
                    <span>Active</span>
                  </p>
                )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default MediaHouseDetails;
