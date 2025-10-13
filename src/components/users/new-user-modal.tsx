"use client";

import { AppDispatch, RootState } from "@/lib/store";
import { createMediaHouseUser } from "@/lib/users/users";
import { Plus, SunIcon, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/button";
import Input from "../shared/input";

function NewUserModal({path}:{path:string}) {
  const newUserModal = useRef<HTMLDialogElement>(null);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const loading = useSelector((state: RootState) => state.users.addingUser);
  const dispatch = useDispatch<AppDispatch>();

  const openModal = () => {
    if (newUserModal.current) {
      newUserModal.current.showModal();
    }
  };

  const closeModal = () => {
    if (newUserModal.current) {
      newUserModal.current.close();
    }
  };

  const handleNewUser = async() => {
    // Handle new user creation logic here
    if (!fullName || !email || !phoneNumber) {
      toast.error("Please fill all fields");
      return;
    }
    const data = {
      fullName,
      email,
      phoneNumber,
      path
    };
    const res = await dispatch(createMediaHouseUser(data));
    if (createMediaHouseUser.fulfilled.match(res)) {
      setFullName("");
      setEmail("");
      setPhoneNumber("");
     
    }
    closeModal();
  };

  return (
    <div>
      <Button className="flex gap-2" variant="primary" onClick={openModal}>
        <Plus size={16} />
        <span>Add New User</span>
      </Button>
      <dialog className="modal modal-end" ref={newUserModal}>
        <div className="modal-box">
          <div className="flex justify-between items-center py-6">
            <h3 className="font-medium text-sm">Add New Platform User</h3>
            <span className="text-red-500">
              <X size={20} className="cursor-pointer" onClick={closeModal} />
            </span>
          </div>
          <div className="mb-6">
            <Input
              label="Full Name"
              placeholder="Enter full name"
              type="text"
              value={fullName}
              onChange={setFullName}
              required
            />
          </div>
          <div className="mb-6">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={setEmail}
              required
            />
          </div>
          <div className="mb-6">
            <Input
              label="Phone Number"
              placeholder="e.g +254712345678"
              type="tel"
              value={phoneNumber}
              onChange={setPhoneNumber}
              required
            />
          </div>
          <div className="flex justify-center w-full">
            {loading === "pending" ? (
              <span className="">
                <SunIcon className="animate-spin text-gray-300" size={18} />
              </span>
            ) : (
              <Button
                variant="primary"
                onClick={handleNewUser}
                disabled={!email || !fullName || !phoneNumber}
                className="w-full"
              >
                Add User
              </Button>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default NewUserModal;
