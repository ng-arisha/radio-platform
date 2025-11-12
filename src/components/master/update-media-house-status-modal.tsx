"use client";

import { updateMiadHouseStatus } from "@/lib/media/media";
import { AppDispatch, RootState } from "@/lib/store";
import { Power, SunIcon, X } from "lucide-react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/button";

function UpdateMediaHouseStatusModal({
  mediaHouse,
  status,
}: {
  mediaHouse: MediaHouseType;
  status: "active" | "inactive" | "deleted";
}) {
  const activateOrDeactivateModal = useRef<HTMLDialogElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(
    (state: RootState) => state.media.updatingMediaStatus
  );

  const openModal = () => {
    if (activateOrDeactivateModal.current) {
      activateOrDeactivateModal.current.showModal();
    }
  };

  const closeModal = () => {
    if (activateOrDeactivateModal.current) {
      activateOrDeactivateModal.current.close();
    }
  };

  const handleMediaStatusUpdate = async () => {
    const data = {
      id: mediaHouse._id,
      status: status,
    };

    const res = await dispatch(updateMiadHouseStatus(data));

    if (updateMiadHouseStatus.fulfilled.match(res)) {
      closeModal();
    }
  };
  return (
    <div>
      <button
        onClick={openModal}
        type="button"
        className={`p-2 cursor-pointer ${status === "active" ? "text-green-500" : "text-red-500"} mr-2 rounded-md`}
      >
        <Power className="" size={16} />
      </button>
      <dialog ref={activateOrDeactivateModal} className="modal">
        <div className="modal-box">
          <div className="flex justify-between items-center gap-6 mb-4">
            <h3 className="font-bold text-lg">Activate/Deactivate</h3>
            <X className="text-red-500 cursor-pointer" size={28} />
          </div>
          <h3 className="font-bold text-lg">
            You are about to{" "}
            {mediaHouse.status === "active" ? "Deactivate" : "Reactivate"}{" "}
            {mediaHouse.name}
          </h3>
          <div className="flex justify-center items-center mt-6">
            {loading === "pending" ? (
              <SunIcon className="animate-spin text-gray-300" size={28} />
            ) : (
              <Button
                onClick={handleMediaStatusUpdate}
                className="w-full"
                variant="primary"
              >
                Save Changes
              </Button>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default UpdateMediaHouseStatusModal;
