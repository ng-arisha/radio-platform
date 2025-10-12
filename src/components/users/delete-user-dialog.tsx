import { AppDispatch, RootState } from "@/lib/store";
import { deleteUser } from "@/lib/users/users";
import { SunIcon, Trash2 } from "lucide-react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/button";

function DeleteUserDialogue({userId,name}:{userId:string,name:string}) {
  const deleteUserModal = useRef<HTMLDialogElement>(null);
  const loading = useSelector((state: RootState) => state.users.addingUser);
  const dispatch = useDispatch<AppDispatch>();
  const closeModal = () => {
    if (deleteUserModal.current) {
      deleteUserModal.current.close();
    }
  };
  const openModal = () => {
    if (deleteUserModal.current) {
      deleteUserModal.current.showModal();
    }
  };
  const handleDeleteUser = async () => {
    const res = await dispatch(deleteUser({id:userId}));
    if (deleteUser.fulfilled.match(res)) {
      // User deleted successfully
      closeModal();
    }
 
  }
  return (
    <div>
      <button
      onClick={openModal}
        type="button"
        className="p-2 cursor-pointer text-red-500 mr-2 rounded-md"
      >
        <Trash2 className="" size={16} />
      </button>
      <dialog ref={deleteUserModal} className="modal">
        <div className="modal-box">
          <p className="py-6 text-red-500">Are you sure you want to permanently delete {name} ?</p>
          <div className="flex justify-between items-center">
            {
                loading === "pending" ? (
                    <span>
                        <SunIcon className="animate-spin text-gray-100" size={16} />
                    </span>
                ):(
                    <Button onClick={handleDeleteUser} variant="danger">
                Yes, Delete User
            </Button>
                )
            }

            <Button variant="secondary" onClick={closeModal}>
                Cancel
            </Button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default DeleteUserDialogue;
