"use client";

import { updateMiadHouse } from "@/lib/media/media";
import { AppDispatch, RootState } from "@/lib/store";
import { Edit, SunIcon, X } from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/button";
import Input from "../shared/input";

function EditMediaHouseModal({ mediaHouse }: { mediaHouse: MediaHouseType }) {
  const editMediaHouseModal = useRef<HTMLDialogElement>(null);
  const loading = useSelector((state: RootState) => state.media.loading);
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState(mediaHouse.name);
  const [address, setAddress] = useState(mediaHouse.address);

  const openModal = () => {
    if (editMediaHouseModal.current) {
      editMediaHouseModal.current.showModal();
    }
  };

  const closeModal = () => {
    if (editMediaHouseModal.current) {
      editMediaHouseModal.current.close();
    }
  };

  const handleMediaHouseUpdate = async () => {
    const data = {
      id: mediaHouse._id,
      name,
      address,
    };

    await dispatch(updateMiadHouse(data));
  };
  return (
    <div>
      <button
        onClick={openModal}
        type="button"
        className="p-2 cursor-pointer text-orange-500 mr-2 rounded-md"
      >
        <Edit className="" size={16} />
      </button>
      <dialog ref={editMediaHouseModal} className="modal">
        <div className="modal-box">
          <div className="flex justify-between items-center gap-6 mb-4">
            <h3 className="font-bold text-lg">
              Edit {mediaHouse.name} Details
            </h3>
            <X
              onClick={closeModal}
              className="text-red-500 cursor-pointer"
              size={28}
            />
          </div>
          <div className="mt-6">
            <Input
              value={name === "" ? mediaHouse.name : name}
              onChange={setName}
              label="Media House Name"
              type="text"
            />
          </div>
          <div className="mt-6">
            <Input
              value={address === "" ? mediaHouse.address : address}
              onChange={setAddress}
              label="Media House Address"
              type="text"
            />
          </div>
          <div className="flex justify-center items-center w-full mt-6">
            {loading === "pending" ? (
              <SunIcon className="animate-spin text-gray-100" size={24} />
            ) : (
              <Button
                onClick={handleMediaHouseUpdate}
                variant="primary"
                className="w-full"
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

export default EditMediaHouseModal;
