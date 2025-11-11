import Button from "@/components/shared/button";
import Select from "@/components/shared/reusable-select-input";
import { assignPresenterToShow } from "@/lib/shows/shows";
import { AppDispatch, RootState } from "@/lib/store";
import { getShowPresenters } from "@/lib/users/users";
import { SunIcon, Users, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

// export enum SHOW_ROLES {
//     HOST = 'host',
//     CO_HOST = 'co_host',
//     PRESENTER = 'presenter',
//     DJ = 'dj',
//   }

const showRoles = [
  { label: "Host", value: "host" },
  { label: "Co-Host", value: "co_host" },
  { label: "Presenter", value: "presenter" },
  { label: "DJ", value: "dj" },
];

function AssignShowPresenter({ show }: { show: ShowType }) {
  const assignPresenterModal = useRef<HTMLDialogElement>(null);
  const presenters = useSelector(
    (state: RootState) => state.users.presenterUsers
  );

  const loading = useSelector((state: RootState) => state.shows.loading);

  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>(showRoles[0].value);
  const dispatch = useDispatch<AppDispatch>();
  const openModal = () => {
    if (assignPresenterModal.current) {
      assignPresenterModal.current.showModal();
    }
  };

  const closeModal = () => {
    if (assignPresenterModal.current) {
      assignPresenterModal.current.close();
    }
  };

  useEffect(() => {
    dispatch(getShowPresenters());
  }, [dispatch]);

  const modifiedPresenters = presenters.map((presenter) => ({
    label: presenter.fullName,
    value: presenter._id,
  }));

  const handleAssignPresenter = async () => {
    // Dispatch action to assign presenter to show
    console.log("Clicked");
    if (selectedUser.trim()==="" || selectedRole.trim()==="") {
      toast.error("Please select both presenter and role");
      return;
    }
    const data = {
      id: show._id,
      userId: selectedUser,
      role: selectedRole,
    };

    console.log("Assigning presenter with data:", data);

    const res = await dispatch(assignPresenterToShow(data));
    if (res.meta.requestStatus === "fulfilled") {
      // toast.success("Presenter assigned successfully");
      closeModal();
    }
  };
  return (
    <div>
      <button
        onClick={openModal}
        type="button"
        className="p-2 text-gray-400 hover:bg-gray-900 rounded-lg transition-colors"
        title="Edit Show"
      >
        <Users size={18} />
      </button>
      <dialog ref={assignPresenterModal} className="modal">
        <div className="modal-box">
          <div className="flex justify-between items-center gap-8">
            <h3 className="font-bold text-lg">
              Assign Presenter to {show.name}
            </h3>
            <X
              className="cursor-pointer text-red-600"
              onClick={closeModal}
              size={28}
            />
          </div>
          <div className="mt-4">
            <Select
              value={selectedUser}
              onChange={(value) => setSelectedUser(value as string)}
              options={modifiedPresenters}
              label="Select Presenter"
              Icon={Users}
            />
          </div>
          <div className="mt-4">
            <Select
              value={selectedRole}
              onChange={(value) => setSelectedRole(value as string)}
              options={showRoles}
              label="Select Role"
            />
          </div>
          <div className="mt-4 flex justify-center items-center">
            {loading === "pending" ? (
              <SunIcon className="animate-spin text-gray-300" size={24} />
            ) : (
              <Button className="w-full" onClick={handleAssignPresenter}>
                Assign
              </Button>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default AssignShowPresenter;
