"use client";

import { newMedia } from "@/lib/media/media";
import { AppDispatch, RootState } from "@/lib/store";
import { getMediaHouseUsers } from "@/lib/users/users";
import { LocationEdit, Plus, RadioTower, SunIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/button";
import Input from "../shared/input";

function NewMediaHouseModal() {
  const newMediaHouseModal = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [selectedUserId, setSelectedSUserId] = useState("");
  const mediaHouseUsers = useSelector(
    (state: RootState) => state.users.mediahouseUsers
  );
  const loading = useSelector(
    (state: RootState) => state.media.addingMediaHouse
  );
  const dispatch = useDispatch<AppDispatch>();

  const openModal = () => {
    if (newMediaHouseModal.current) {
      newMediaHouseModal.current.showModal();
    }
  };
  const closeModal = () => {
    if (newMediaHouseModal.current) {
      newMediaHouseModal.current.close();
    }
  };
  const handleNewMediaHouse = async () => {
    if (!name || !address || !selectedUserId) {
      toast.error("Please provide all required details");
      return;
    }
    const data = {
      name,
      address,
      userId: selectedUserId,
    };
    const res = await dispatch(newMedia(data));
    if (newMedia.fulfilled.match(res)) {
      setAddress("");
      setName("");
      setSelectedSUserId("");
      closeModal();
    }
  };

  useEffect(() => {
    dispatch(getMediaHouseUsers());
  }, [dispatch]);
  return (
    <div>
      <Button
        onClick={openModal}
        variant="primary"
        className="flex space-x-1 items-center"
      >
        <Plus size={16} />
        <span>New Media House</span>
      </Button>
      <dialog className="modal modal-end" ref={newMediaHouseModal}>
        <div className="modal-box">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-medium text-lg text-gray-200">
              New Media House
            </h3>
            <button
              type="button"
              className=" hover:text-red-500 bg-transparent text-red-500 cursor-pointer"
              onClick={closeModal}
            >
              <X size={24} />
            </button>
          </div>

          <div className="mb-6">
            <Input
              label="Media House Name"
              placeholder="Enter media house name"
              value={name}
              onChange={setName}
              required
              type="text"
              Icon={RadioTower}
            />
          </div>
          <div className="mb-6">
            <Input
              label="Media House Address"
              placeholder="Enter media house address"
              value={address}
              onChange={setAddress}
              required
              type="text"
              Icon={LocationEdit}
            />
          </div>

          <div className="my-3">
            <label className="block text-sm font-medium text-gray-300">
              Select Adminstrator <span className="text-red-400">*</span>
            </label>
            <select
              id="station"
              value={selectedUserId}
              onChange={(e) => setSelectedSUserId(e.target.value)}
              className="w-full pl-3 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select Admin</option>
              {mediaHouseUsers?.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.fullName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6 flex justify-center items-center">
            {loading === "pending" ? (
              <SunIcon className="animate-spin text-gray-200" size={24} />
            ) : (
              <Button
                disabled={!name || !address || !selectedUserId}
                onClick={handleNewMediaHouse}
                variant="primary"
                className="w-full"
              >
                Create Media House
              </Button>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default NewMediaHouseModal;
