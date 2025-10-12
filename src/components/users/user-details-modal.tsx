import { AppDispatch, RootState } from "@/lib/store";
import { updateUser } from "@/lib/users/users";
import { Edit2, Eye, SunIcon, X } from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/button";
import Input from "../shared/input";
import TextColumn from "../shared/text-column";

function UserDetailsModal({
  user,
  action,
}: {
  user: UserType;
  action: string;
}) {
  const userDetailsModal = useRef<HTMLDialogElement>(null);
  const [fullName, setFullName] = useState(user.fullName);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [email, setEmail] = useState(user.email);
  const [status, setStatus] = useState(user.status);
  const loading = useSelector((state: RootState) => state.users.addingUser);
  const dispatch = useDispatch<AppDispatch>();

  const openModal = () => {
    if (userDetailsModal.current) {
      userDetailsModal.current.showModal();
    }
  };
  const closeModal = () => {
    if (userDetailsModal.current) {
      userDetailsModal.current.close();
    }
  };

  const handleUpdateUser = async () => {
    const data = {
      id: user._id,
      fullName,
      email,
      phoneNumber,
      status,
    };
    const res = await dispatch(updateUser(data));
    if (updateUser.fulfilled.match(res)) {
      closeModal();
    }
  };
  return (
    <div>
      <button
        onClick={openModal}
        type="button"
        className="p-2 cursor-pointer text-green-500 mr-2 rounded-md"
      >
        {action === "view" ? (
          <Eye className="" size={16} />
        ) : action === "edit" ? (
          <Edit2 className="" size={16} />
        ) : (
          ""
        )}
      </button>
      <dialog className="modal modal-end" ref={userDetailsModal}>
        <div className="modal-box">
          <div className="flex justify-between items-center py-6">
            <h3 className="font-medium text-sm">
              {action === "view"
                ? "User Details"
                : action === "edit"
                  ? "Edit User Details"
                  : ""}
            </h3>
            <span className="text-red-500">
              <X size={20} className="cursor-pointer" onClick={closeModal} />
            </span>
          </div>
          {action === "view" ? (
            <div className="grid grid-cols-2 gap-4">
              <TextColumn label="Full Name" value={user.fullName} />
              <TextColumn label="Email" value={user.email} />
              <TextColumn label="Phone Number" value={user.phoneNumber} />
              <TextColumn label="Status" value={user.status} />
              <TextColumn
                label="Date Registered"
                value={new Date(user.createdAt).toLocaleDateString()}
              />
            </div>
          ) : (
            <>
              <div className="my-3">
                <Input
                  label="Full Name"
                  value={fullName}
                  onChange={setFullName}
                  placeholder="Enter full name"
                  type="text"
                />
              </div>
              <div className="my-3">
                <Input
                  label="Email"
                  value={email}
                  onChange={setEmail}
                  placeholder="Enter email"
                  type="email"
                />
              </div>

              <div className="my-3">
                <Input
                  label="Phone Number"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  placeholder="Enter phone number"
                  type="tel"
                />
              </div>
              {user.status !== "pending" && (
                <div className="my-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={status === "active"}
                      onChange={() =>
                        setStatus(status === "active" ? "inactive" : "active")
                      }
                      className="h-4 w-4 text-orange-400 bg-gray-700 border-gray-600 rounded focus:ring-orange-400 focus:ring-2"
                    />
                    <span className="text-gray-300">Activate/Deactivate</span>
                  </label>
                </div>
              )}

              <div className="flex justify-center w-full">
                {loading === "pending" ? (
                  <span className="">
                    <SunIcon className="animate-spin text-gray-300" size={18} />
                  </span>
                ) : (
                  <Button onClick={handleUpdateUser} variant="primary" className="w-full">
                    Update User
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
}

export default UserDetailsModal;
