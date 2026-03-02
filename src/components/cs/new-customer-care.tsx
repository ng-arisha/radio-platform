"use client";

import { AppDispatch, RootState } from "@/lib/store";
import { newStationCustomerCare } from "@/lib/users/users";
import { Mail, Phone, Plus, SunIcon, User, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/button";
import Input from "../shared/input";

function NewCustomerCareModal() {
    const params = useParams<{ stationId: string }>();
  const newCsModal = useRef<HTMLDialogElement>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
 

  const dispatch = useDispatch<AppDispatch>();
  //const shows = useSelector((state: RootState) => state.shows.stationShows);
  const loading = useSelector((state: RootState) => state.users.addingUser);

 

  const openModal = () => {
    if (newCsModal.current) {
        newCsModal.current.showModal();
    }
  };

  const closeModal = () => {
    if (newCsModal.current) {
        newCsModal.current.close();
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
      stationId: params.stationId,
    };
   
    const res = await dispatch(newStationCustomerCare(data));
    console.log(res);
    if (newStationCustomerCare.fulfilled.match(res)) {
      closeModal();
      // reset fields
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      
    }
    closeModal();
    
  };
    return (
        <div>
      <Button className="flex space-x-1 items-center" onClick={openModal}>
        <Plus size={16} />
        <span>New Customer Care</span>
      </Button>
      <dialog ref={newCsModal} className="modal modal-end">
        <div className="modal-box">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-gray-200 text-xl font-medium">
              Add a New Customer Care
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
                Add Customer Care
              </Button>
            )}
          </div>
        </div>
      </dialog>
    </div>
    )
}

export default NewCustomerCareModal
