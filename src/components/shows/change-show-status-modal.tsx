"use client";

import { changeShowStatus } from "@/lib/shows/shows";
import { AppDispatch, RootState } from "@/lib/store";
import { Power, SunIcon } from "lucide-react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/button";

function ChangeShowStatusModal({show}:{show:ShowType}) {
    const poweroffOrOnShowModal = useRef<HTMLDialogElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.shows.loading);
  
    const openModal = () => {
      if (poweroffOrOnShowModal.current) {
        poweroffOrOnShowModal.current.showModal();
      }
    };
  
    const closeModal = () => {
      if (poweroffOrOnShowModal.current) {
        poweroffOrOnShowModal.current.close();
      }
    };
  
    const handleStatusChange = async () => {
      const data = {
        id: show._id,
        status: show.status === "active" ? "inactive" : "active",
      };
      await dispatch(changeShowStatus(data));
    };
    return (
        <div>
      <button
      type="button"
        onClick={openModal}
        className="p-2 hover:bg-gray-600 rounded transition-colors cursor-pointer"
        title={show.status === "active" ? "Disable" : "Activate"}
      >
        <Power
          size={18}
          className={
            show.status === "active" ? "text-green-400" : "text-red-400"
          }
        />
      </button>
      <dialog ref={poweroffOrOnShowModal} className="modal">
        <div className="modal-box">
          <h3 className="font-medium text-lg">Show Status Upadate!</h3>
          {show.status === "active" ? (
            <div className="text-red-500">Are you sure you want to Deactivate {show.name}?</div>
          ) : (
            <div>You are about to reactivate ${show.name}</div>
          )}
          <div className="flex justify-between items-center mt-4">
            {loading === "pending" ? (
              <SunIcon className="animate-spin mb-2" size={24} />
            ) : (
              <Button onClick={handleStatusChange} className="cursor-pointer">
                {show.status === "active" ? "Deactivate" : "Activate"}
              </Button>
            )}

            <Button onClick={closeModal} variant="secondary">
              Cancel
            </Button>
          </div>
        </div>
      </dialog>
    </div>
    )
}

export default ChangeShowStatusModal
