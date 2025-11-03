"use client";

import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import TextColumn from "@/components/shared/text-column";
import { updateShow } from "@/lib/shows/shows";
import { AppDispatch, RootState } from "@/lib/store";
import { daysOfWeek, formatDate } from "@/utils/utils";
import { Edit, Eye, Radio, SunIcon, X } from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ViewShowDetails({
  show,
  purpose,
}: {
  show: ShowType;
  purpose: string;
}) {
  const viewShowDetailsModal = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState(show.name);
  const [code, setCode] = useState(show.code);
  const [startTime, setStartTime] = useState(show.startTime);
  const [endTime, setEndTime] = useState(show.endTime);
  const loading = useSelector((state: RootState) => state.shows.updatingShow);
  const dispatch = useDispatch<AppDispatch>();

  const [activedays, setActiveDays] = useState<string[]>([]);

  const onSelectDay = (day: string) => {
    if (activedays.includes(day)) {
      setActiveDays(activedays.filter((d) => d !== day));
    } else {
      setActiveDays([...activedays, day]);
    }
  }
  const openModal = () => {
    if (viewShowDetailsModal.current) {
      viewShowDetailsModal.current.showModal();
    }
  };

  const closeModal = () => {
    if (viewShowDetailsModal.current) {
      viewShowDetailsModal.current.close();
    }
  };

  const handleUpdateShow = async () => {
    const data = {
      id: show._id,
      name,
      code,
      startTime,
      endTime,
    };
    const res = await dispatch(updateShow(data));
    if (updateShow.fulfilled.match(res)) {
      closeModal();
    }
  };
  return (
    <div>
      {purpose === "view" ? (
        <button
          type="button"
          onClick={openModal}
          className="p-2 text-blue-400 hover:bg-blue-900 rounded-lg transition-colors cursor-pointer"
          title="View Details"
        >
          <Eye size={18} />
        </button>
      ) : (
        <button
          onClick={openModal}
          type="button"
          className="p-2 text-yellow-400 hover:bg-yellow-900 rounded-lg transition-colors"
          title="Edit Show"
        >
          <Edit size={18} />
        </button>
      )}

      <dialog ref={viewShowDetailsModal} className="modal modal-end">
        <div className="modal-box">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-gray-200 text-xl font-medium">
              {purpose === "view" ? "Show Details" : "Edit Show Details"}
            </h1>
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-sm btn-circle btn-ghost text-red-500"
            >
              <X />
            </button>
          </div>
          {purpose === "view" ? (
            <div className="grid grid-cols-3 gap-4">
              <TextColumn label="Show Name" value={show.name} />
              <TextColumn label="Show Code" value={show.code} />
              <TextColumn label="Start Time" value={show.startTime} />
              <TextColumn label="End Time" value={show.endTime} />
              <TextColumn label="Show Status" value={show.status} />
              <TextColumn
                label="Date Created"
                value={formatDate(show.createdAt)}
              />
            </div>
          ) : (
            // Edit form can be placed here
            <div>
              <div className="mb-6">
                <Input
                  label="Show Name"
                  value={name}
                  onChange={setName}
                  type="text"
                  Icon={Radio}
                />
              </div>
              {/* <div className="mb-6">
                <Input
                  label="Show Code"
                  value={code}
                  onChange={setCode}
                  type="text"
                />
              </div> */}
              <div className="flex justify-between gap-4 mb-6 w-full">
                <div className="w-full">
                  <Input
                    label="Start Time"
                    value={startTime}
                    onChange={setStartTime}
                    type="time"
                  />
                </div>
                <div className="w-full">
                  <Input
                    label="End Time"
                    value={endTime}
                    onChange={setEndTime}
                    type="time"
                  />
                </div>
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
              <div className="flex justify-center items-center w-full">
                {loading === "pending" ? (
                  <SunIcon className="animate-spin text-gray-400" size={20} />
                ) : (
                  <Button
                    onClick={handleUpdateShow}
                    variant="primary"
                    className="w-full"
                  >
                    Save Changes
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
}

export default ViewShowDetails;
