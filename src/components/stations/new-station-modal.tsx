"use client";

import { getMediaStations, newStation } from "@/lib/stations/stations";
import { AppDispatch, RootState } from "@/lib/store";
import { getStationAdminUsers } from "@/lib/users/users";
import { useMutation } from "convex/react";
import { MapPinHouse, Plus, Radio, RadioTower, SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../../convex/_generated/api";
import Button from "../shared/button";
import Input from "../shared/input";

function NewStationModal({ page, role }: { page: string; role: string }) {
  const newStationModal = useRef<HTMLDialogElement>(null);
  const [stationName, setStationName] = useState("");
  const [address, setAddress] = useState("");
  const [frequency, setFrequency] = useState("");
  const [enabled, setEnabled] = useState(false);

  const [selectedUser, setSelectedUser] = useState("");

  const [code, setCode] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedStation, setSelectedStation] = useState("");

  const newShow = useMutation(api.shows.create);
  const stationUsers = useSelector(
    (state: RootState) => state.users.stationAdminUsers
  );
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ mediaId: string }>();
  const mediaParams = useParams<{ mediaIdd: string }>();
  const loading = useSelector(
    (state: RootState) => state.stations.addingStation
  );

  useEffect(() => {
    dispatch(getStationAdminUsers());
    dispatch(getMediaStations({ id: params.mediaId }));
  }, [page, dispatch]);

  const stations = useSelector(
    (state: RootState) => state.stations.mediaStations
  );
  const showModal = () => {
    if (newStationModal.current) {
      newStationModal.current.showModal();
    }
  };

  const closeModal = () => {
    if (newStationModal.current) {
      newStationModal.current.close();
    }
  };

  const handleNewStation = async () => {
    if (page === "stations") {
      if (!stationName || !address || !frequency) {
        toast.error("Please provide all missing details");
        return;
      }
      const data = {
        name: stationName,
        address,
        code,
        frequency,
        userId: selectedUser,
        mediaHouseId: role === "admin" ? params.mediaId : mediaParams.mediaIdd,
      };
      const res = await dispatch(newStation(data));
      if (res.type === "stations/newStation/rejected") {
        closeModal();
        return;
      }
    }

    setAddress("");
    setStationName("");
    setFrequency("");
    closeModal();
    toast.success(
      `${page === "stations" ? "Station" : "Show"} created successfully`
    );
  };
  return (
    <div>
      <Button className="flex space-x-2" onClick={showModal} variant="primary">
        <Plus className="text-background" size={20} />
        <span className="text-background">
          {page === "stations" ? "Add Station" : "Add Show"}
        </span>
      </Button>
      <dialog ref={newStationModal} className="modal modal-end">
        <div className="modal-box">
          <h3 className="font-normal text-lg pb-3">
            {page === "stations" ? "Add New Station" : "Add New Show"}
          </h3>
          <div className="w-full h-[1px] bg-gray-400" />
          {page === "shows" && (
            <div className="my-3">
              <label className="block text-sm font-medium text-gray-300">
                Select Station <span className="text-red-400">*</span>
              </label>
              <select
                id="station"
                value={selectedStation}
                onChange={(e) => setSelectedStation(e.target.value)}
                className="w-full pl-3 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select Station</option>
                {stations?.map((station) => (
                  <option key={station._id} value={station._id}>
                    {station.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {page === "stations" && (
            <div className="my-3">
              <label className="block text-sm font-medium text-gray-300">
                Select Adminstrator <span className="text-red-400">*</span>
              </label>
              <select
                id="adminstrator"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full pl-3 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select User</option>
                {stationUsers?.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.fullName}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="my-3">
            <Input
              value={stationName}
              onChange={setStationName}
              label={page === "stations" ? "Station Name" : "Show Name"}
              type="text"
              Icon={RadioTower}
              required
              placeholder={`Enter ${page === "stations" ? "Station" : "Show"} Name`}
            />
          </div>
          {page === "stations" && (
            <div className="my-3">
              <Input
                value={address}
                onChange={setAddress}
                label="Station Address"
                type="text"
                Icon={MapPinHouse}
                required
                placeholder="Enter Station Address"
              />
            </div>
          )}
          {page === "stations" && (
            <div className="my-3">
              <Input
                value={frequency}
                onChange={setFrequency}
                label="Frequency"
                type="text"
                Icon={Radio}
                required
                placeholder="Enter Station frequency"
              />
            </div>
          )}
          <div className="my-3">
            <Input
              value={code}
              onChange={setCode}
              label="Station Code"
              type="text"
              required
              placeholder="Enter Show code"
            />
          </div>

          {page === "shows" && (
            <div className="my-3 flex justify-between items-center space-x-2 w-full">
              <div className="w-full">
                <Input
                  value={startTime}
                  onChange={setStartTime}
                  label="Start Time"
                  type="time"
                  required
                  placeholder=""
                />
              </div>

              <div className="w-full">
                <Input
                  value={endTime}
                  onChange={setEndTime}
                  label="End Time"
                  type="time"
                  required
                  placeholder=""
                />
              </div>
            </div>
          )}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="enabled"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
            />
            <label htmlFor="enabled" className="ml-2 text-sm text-gray-500">
              {page === "stations" ? " Station Enabled" : "Jackpot Enabled"}
            </label>
          </div>
          <div className="flex justify-between items-cente mt-6">
            {loading === "pending" ? (
              <SunIcon className="text-gray-100 animate-spin" size={20} />
            ) : (
              <Button onClick={handleNewStation} variant="primary">
                Submit
              </Button>
            )}
            <Button onClick={closeModal} variant="secondary">
              Cancel
            </Button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default NewStationModal;
