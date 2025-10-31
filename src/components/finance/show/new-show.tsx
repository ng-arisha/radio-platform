"use client";

import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import { getStationSummary } from "@/lib/media/media";
import { createNewShow } from "@/lib/shows/shows";
import { AppDispatch, RootState } from "@/lib/store";
import { UserRole } from "@/utils/utils";
import { Plus, Radio, SunIcon, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

function NewShow({role}:{role:string}) {
  const newStationModal = useRef<HTMLDialogElement>(null);
  const [showName, setShowName] = useState("");
  const [code, setCode] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedStation, setSelectedStation] = useState("");
  const [activedays, setActiveDays] = useState<string[]>([]);

  const onSelectDay = (day: string) => {
    if (activedays.includes(day)) {
      setActiveDays(activedays.filter((d) => d !== day));
    } else {
      setActiveDays([...activedays, day]);
    }
  }

  const stationsData = useSelector(
      (state: RootState) => state.media.stationSummary
    );
    const param = useParams<{ mediaIdd: string }>();
  
    useEffect(() => {
      dispatch(getStationSummary({ id: param.mediaIdd }));
    }, []);

  const loading = useSelector((state: RootState) => state.shows.loading);
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ stationId: string }>();

  const openModal = () => {
    if (newStationModal.current) {
      newStationModal.current.showModal();
    }
  };

  const closeModal = () => {
    if (newStationModal.current) {
      newStationModal.current.close();
    }
  };

  const handleNewShow = async () => {
    if (!showName || !code || !startTime || !endTime || activedays.length === 0) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const data = {
      name: showName,
      code,
      startTime,
      endTime,
      stationId: role ===UserRole.MEDIA_HOUSE ? selectedStation: params.stationId,
      activeDays: activedays,
    };
    const res = await dispatch(createNewShow(data));
    console.log(res);
    if (createNewShow.fulfilled.match(res)) {
      closeModal();
      // reset fields
      setShowName("");
      setCode("");
      setStartTime("");
      setEndTime("");
    }
  };
  return (
    <div>
      <Button className="flex space-x-1 items-center" onClick={openModal}>
        <Plus size={16} />
        <span>New Show</span>
      </Button>
      <dialog ref={newStationModal} className="modal modal-end">
        <div className="modal-box">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-gray-200 text-xl font-medium">
              Create a New Show
            </h1>
            <button
              onClick={closeModal}
              className="btn btn-sm btn-circle btn-ghost"
            >
              <X />
            </button>
          </div>
          {
            role === UserRole.MEDIA_HOUSE && (
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
                {stationsData?.map((station) => (
                  <option key={station.id} value={station.id}>
                    {station.name}
                  </option>
                ))}
              </select>
            </div>
            )
          }
          {/* input fields */}
          <div className="mb-6">
            <Input
              label="Show Name"
              required
              value={showName}
              onChange={setShowName}
              placeholder="Enter show name"
              type="text"
              Icon={Radio}
            />
          </div>

          <div className="mb-6">
            <Input
              label="Show Code"
              required
              value={code}
              onChange={setCode}
              placeholder="Enter show code"
              type="text"
            />
          </div>
          <div className="flex justify-between gap-4 mb-6 w-full">
            <div className="w-full">
              <Input
                label="Start Time"
                required
                value={startTime}
                onChange={setStartTime}
                placeholder="HH:MM"
                type="time"
              />
            </div>
            <div className="w-full">
              <Input
                label="End Time"
                required
                value={endTime}
                onChange={setEndTime}
                placeholder="HH:MM"
                type="time"
              />
            </div>
          </div>
          <div>
            <label className="block text-md font-medium text-gray-300 mb-2">
              Active Days
            </label>
          </div>
          <div className="grid grid-cols-7 gap-4 mt-2 mb-6">
              {daysOfWeek.map((day,index) => (
                <div
                  key={index}
                  onClick={() => onSelectDay(day)}
                  className={` rounded-lg flex items-center justify-center h-12 w-12 cursor-pointer  transition-all ${
                    activedays.includes(day)
                      ? "bg-orange-400 text-gray-50"
                      : "bg-gray-700 text-gray-200 hover:bg-gray-700/80"
                  }`}
                >
                  {day.slice(0, 3)}
                </div>
              ))}
            </div>
          <div className="w-full flex justify-center items-center">
            {
              loading === 'pending' ? (
                <SunIcon className="animate-spin text-yellow-400" size={24} />
              ):(
                <Button
              onClick={handleNewShow}
              variant="primary"
              className="w-full"
            >
              Create Show
            </Button>
              )
            }
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default NewShow;
