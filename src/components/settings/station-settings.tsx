"use client";

import { editStation, stationDetails } from "@/lib/stations/stations";
import { AppDispatch, RootState } from "@/lib/store";
import { SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/button";
import Input from "../shared/input";
import ReusableLoader from "../shared/reusable-loader";

function StationSettings() {
  const params = useParams<{ stationId: string }>();
  const station = useSelector((state: RootState) => state.stations.station);
  const loading = useSelector((state: RootState) => state.stations.loading);
  const addingStation = useSelector(
    (state: RootState) => state.stations.addingStation
  );
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState(station?.name || "");
  const [address, setAddress] = useState(station?.address || "");
  const [frequency, setFrequency] = useState(station?.frequency || "");
  const [status, setStatus] = useState(station?.status || "");

  useEffect(() => {
    dispatch(stationDetails({ id: params.stationId }));
  }, []);

  const handleUpdateSTation = async () => {
    const data = {
      id: params.stationId,
      name: name === "" ? station?.name : name,
      address: address === "" ? station?.address : address,
      frequency: frequency === "" ? station?.frequency : frequency,
      status: status === "" ? station?.status : status,
    };
    const res = dispatch(editStation(data));
  };

  return (
    <div>
      {loading === "pending" || station === null ? (
        <ReusableLoader />
      ) : (
        <div className="flex justify-start items-center ">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 max-w-2xl w-full">
            <div className="mb-4">
              <Input
                label="Station Name"
                type="text"
                value={name === "" ? station.name : name}
                onChange={setName}
              />
            </div>
            <div className="mb-4">
              <Input
                label="Station Address"
                type="text"
                value={address === "" ? station.address : address}
                onChange={setAddress}
              />
            </div>
            <div className="mb-4">
              <Input
                label="Station Frequency"
                type="text"
                value={frequency === "" ? station.frequency : frequency}
                onChange={setFrequency}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="enabled"
                checked={
                  status === ""
                    ? station.status === "enabled"
                    : status === "enabled"
                }
                onChange={(e) =>
                  setStatus(e.target.checked ? "enabled" : "disabled")
                }
                className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
              />
              <label htmlFor="enabled" className="ml-2 text-sm text-gray-500">
                Station Enabled
              </label>
            </div>

            {addingStation === "pending" ? (
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
      )}
    </div>
  );
}

export default StationSettings;
