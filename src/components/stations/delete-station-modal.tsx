"use client";

import { deleteStation, getAllStations } from "@/lib/stations/stations";
import { AppDispatch, RootState } from "@/lib/store";
import { SunIcon, Trash2Icon, X } from "lucide-react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/button";

function DeleteStationModal({ station }: { station: StationType }) {
  const deleteStationModal = useRef<HTMLDialogElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.stations.deleteingStation);

  const openModal = () => {
    if (deleteStationModal.current) {
      deleteStationModal.current.showModal();
    }
  };

  const closeModal = () => {
    if (deleteStationModal.current) {
      deleteStationModal.current.close();
    }
  };

  const handleDeleteStation = async () => {
    const res = await dispatch(deleteStation({ id: station._id }));
    if (deleteStation.fulfilled.match(res)) {
      closeModal();
      dispatch(getAllStations())
    }
  };
  return (
    <div>
      <button
        type="button"
        onClick={openModal}
        className="p-2 cursor-pointer text-red-500 rounded-md"
      >
        <Trash2Icon className="" size={16} />
      </button>
      <dialog ref={deleteStationModal} className="modal">
        <div className="modal-box">
          <div className="flex justify-between items-center gap-6 mb-4">
            <h3 className="font-bold text-lg">Delete {station.name} station</h3>
            <X
              onClick={closeModal}
              className="text-red-500 cursor-pointer"
              size={28}
            />
          </div>

          <p className="py-4">
            Are you sure you want to delete the station{" "}
            <span className="text-orange-500">{station.name}</span>? This action
            cannot be undone.
          </p>
          <div className="flex justify-center items-center mt-6">
            {loading === "pending" ? (
              <SunIcon className="animate-spin text-gray-100" size={24} />
            ) : (
              <Button
                variant="danger"
                onClick={handleDeleteStation}
                className="w-full"
              >
                {" "}
                Delete
              </Button>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default DeleteStationModal;
