import { Eye, X } from "lucide-react";
import { useRef } from "react";
import TextColumn from "../shared/text-column";

function UserDetailsModal({user}:{user:UserType}) {
  const userDetailsModal = useRef<HTMLDialogElement>(null);
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
  return (
    <div>
      <button
      onClick={openModal}
        type="button"
        className="p-2 cursor-pointer text-green-500 mr-2 rounded-md"
      >
        <Eye className="" size={16} />
      </button>
      <dialog  className="modal modal-end" ref={userDetailsModal}>
        <div className="modal-box">
        <div className="flex justify-between items-center py-6">
            <h3 className="font-medium text-sm">User Details</h3>
            <span className="text-red-500">
              <X size={20} className="cursor-pointer" onClick={closeModal} />
            </span>
          </div>
         <div className="grid grid-cols-2 gap-4">
        <TextColumn label="Full Name" value={user.fullName} />
        <TextColumn label="Email" value={user.email} />
        <TextColumn label="Phone Number" value={user.phoneNumber} />
        <TextColumn label="Status" value={user.status} />
        <TextColumn label="Date Registered" value={new Date(user.createdAt).toLocaleDateString()} />
         </div>
         
        </div>
      </dialog>
    </div>
  );
}

export default UserDetailsModal;
