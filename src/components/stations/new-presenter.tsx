"use client";

import { getShowInStation } from "@/lib/shows/shows";
import { getStationPresenters } from "@/lib/stations/stations";
import { AppDispatch, RootState } from "@/lib/store";
import { createMediaHouseUser } from "@/lib/users/users";
import { Mail, Phone, Plus, SunIcon, User, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/button";
import Input from "../shared/input";

function NewPresenter() {
  const params = useParams<{ stationId: string }>();
  const newStationModal = useRef<HTMLDialogElement>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedShow, setSelectedShow] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const shows = useSelector((state: RootState) => state.shows.stationShows);
  const loading = useSelector((state: RootState) => state.users.addingUser);

  useEffect(() => {
    dispatch(getShowInStation({ id: params.stationId,status:"active",search:"" }));
  }, [dispatch, params.stationId]);

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

  const handleNewPresenter = async () => {
    if (!fullName || !email || !phoneNumber) {
      // handle error
      toast.error("Please fill in all required fields.");
      return;
    }
    const data = {
      fullName,
      email,
      phoneNumber,
      showId: selectedShow,
      path: "new-presenter",
      stationId: params.stationId,
    };
   
    const res = await dispatch(createMediaHouseUser(data));
    console.log(res);
    if (createMediaHouseUser.fulfilled.match(res)) {
      closeModal();
      // reset fields
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setSelectedShow("");
    }
    closeModal();
    // dispatch action to create new presenter
    dispatch(getStationPresenters({ id: params.stationId }));
  };
  return (
    <div>
      <Button className="flex space-x-1 items-center" onClick={openModal}>
        <Plus size={16} />
        <span>New Show Presenter</span>
      </Button>
      <dialog ref={newStationModal} className="modal modal-end">
        <div className="modal-box">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-gray-200 text-xl font-medium">
              Add a New Show Presenter
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
              label="Full Name"
              required
              value={fullName}
              onChange={setFullName}
              type="text"
              Icon={User}
            />
          </div>
          <div className="mb-6">
            <Input
              label="Email Address"
              required
              value={email}
              onChange={setEmail}
              type="email"
              Icon={Mail}
            />
          </div>
          <div className="mb-6">
            <Input
              label="Phone Number"
              required
              value={phoneNumber}
              onChange={setPhoneNumber}
              type="phone"
              Icon={Phone}
            />
          </div>
          

          <div className="flex w-full justify-center items-center">
            {loading === "pending" ? (
              <SunIcon className="animate-spin text-gray-400" size={20} />
            ) : (
              <Button
                onClick={handleNewPresenter}
                variant="primary"
                className="w-full"
              >
                Add Presenter
              </Button>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default NewPresenter;
