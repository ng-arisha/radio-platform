"use client";

import { getSingleMediaHouse, updateMiadHouse } from "@/lib/media/media";
import { AppDispatch, RootState } from "@/lib/store";
import { SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/button";
import Input from "../shared/input";
import ReusableLoader from "../shared/reusable-loader";

function MediaHouseSettings() {
    const loading = useSelector((state:RootState)=>state.media.loading);
    const mediaHouse = useSelector((state:RootState)=>state.media.mediaHouse);
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams<{mediaIdd:string}>();

    const [name,setName] =  useState(mediaHouse?.name ||"");
    const [address,setAddress] =  useState(mediaHouse?.address ||"");
    const [status,setStatus] =  useState(mediaHouse?.status ||"");

    const updatingMediaHouse = useSelector((state:RootState)=>state.media.loading);
    const handleUpdateSTation = async () => {
        const data = {
          id: params.mediaIdd,
          name: name === "" ? mediaHouse?.name : name,
          address: address === "" ? mediaHouse?.address : address,
          
        };
        const res = dispatch(updateMiadHouse(data));
      };

    useEffect(() => {
        dispatch(getSingleMediaHouse({id:params.mediaIdd}))
    }, [dispatch, params]);
    return (
        <div>
            {
                (loading === 'pending' || mediaHouse === null) ? (
                    <ReusableLoader />
                ):(
                    <div className="flex justify-start items-center ">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 max-w-2xl w-full">
            <div className="mb-4">
              <Input
                label="Media House Name"
                type="text"
                value={name === "" ? mediaHouse.name : name}
                onChange={setName}
              />
            </div>
            <div className="mb-4">
              <Input
                label="Media House Address"
                type="text"
                value={address === "" ? mediaHouse.address : address}
                onChange={setAddress}
              />
            </div>
           

            <div className="flex items-center">
              <input
                type="checkbox"
                id="enabled"
                checked={
                  status === ""
                    ? mediaHouse.status === "enabled"
                    : status === "enabled"
                }
                onChange={(e) =>
                  setStatus(e.target.checked ? "enabled" : "disabled")
                }
                className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
              />
              <label htmlFor="enabled" className="ml-2 text-sm text-gray-500">
                Media House Enabled
              </label>
            </div>

            {updatingMediaHouse === "pending" ? (
              <SunIcon className="animate-spin mt-6" />
            ) : (
              <Button
                variant="primary"
                className="mt-6"
                onClick={handleUpdateSTation}
              >
                Save Changes
              </Button>
            )}
          </div>
        </div>
                )
            }
            
        </div>
    )
}

export default MediaHouseSettings
