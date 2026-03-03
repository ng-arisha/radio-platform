import { AppDispatch, RootState } from "@/lib/store";
import { assignMediaHouseAdmin, getMediaHouseUsers } from "@/lib/users/users";
import { SunIcon, User, User2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/button";

function AssignMediaAdmin({mediaId}:{mediaId:string}) {
    const assignMediaAdminModal = useRef<HTMLDialogElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.users.addingUser);
  const mediaHouseUsers = useSelector((state: RootState) => state.users.mediahouseUsers);
  const [selectedAdmin, setSelectedAdmin] = useState<string>("");


  useEffect(() => {
    dispatch(getMediaHouseUsers())
  }, []);

  const openModal = () => {
    if (assignMediaAdminModal.current) {
        assignMediaAdminModal.current.showModal();
    }
  };

  const closeModal = () => {
    if (assignMediaAdminModal.current) {
        assignMediaAdminModal.current.close();
    }
  };

  const handleCommissionAssignment = async () => {
    if (!selectedAdmin) {
      toast.error("Please enter a valid user.");
      return;
    }

    const data = {
        mediaId: mediaId,
        userId: selectedAdmin,
    };
    const res = await dispatch(assignMediaHouseAdmin(data));
    if (res.meta.requestStatus === "fulfilled") {
      closeModal();
    }
  };

  
    return (
        <div>
        <button
          onClick={openModal}
          type="button"
          className="p-2 hover:bg-gray-700 rounded transition-colors cursor-pointer"
          title="Assign Payment Rate"
        >
          <User size={16} className="text-gray-400" />
        </button>
        <dialog ref={assignMediaAdminModal} className="modal">
          <div className="modal-box">
            <div className="flex justify-between items-center mb-4 gap-8">
              <h3 className="font-medium text-lg">
                Assign User Rate to Media House
              </h3>
  
              <X
                className="text-red-500 cursor-pointer"
                size={28}
                onClick={closeModal}
              />
            </div>
            <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
          Select Admin <span className="text-red-400">*</span>
        </label>
      <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User2 className="h-5 w-5 text-gray-400" />
          </div>
        <select
          value={selectedAdmin}
          onChange={(e) => setSelectedAdmin(e.target.value)}
          className={`w-full pl-10 pr-10 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 appearance-none`}
        >
          <option value="" disabled hidden>
              Select Admin
            </option>
          {mediaHouseUsers.map((user) => (
            <option key={user._id} value={user._id}>
              {user.fullName}
            </option>
          ))}
        </select>
        {/* Dropdown indicator */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="h-4 w-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 12a1 1 0 0 1-.707-.293l-3-3a1 1 0 1 1 1.414-1.414L10 9.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3A1 1 0 0 1 10 12z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
            <div className="flex justify-center items-center mt-6 w-full">
              {loading === "pending" ? (
                <SunIcon className="animate-spin text-gray-100" size={32} />
              ) : (
                <Button
                  className="w-full"
                  variant="primary"
                  onClick={handleCommissionAssignment}
                >
                  Assign
                </Button>
              )}
            </div>
          </div>
        </dialog>
      </div>
    )
}

export default AssignMediaAdmin
