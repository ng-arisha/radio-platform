"use client";

import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import { createNewShow } from "@/lib/shows/shows";
import { AppDispatch, RootState } from "@/lib/store";
import { Plus, Radio, SunIcon, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

function NewShow() {
  const newStationModal = useRef<HTMLDialogElement>(null);
  const [showName, setShowName] = useState("");
  const [code, setCode] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

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
    if (!showName || !code || !startTime || !endTime) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const data = {
      name: showName,
      code,
      startTime,
      endTime,
      stationId: params.stationId,
    };
    const res = await dispatch(createNewShow(data));
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
