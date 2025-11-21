import Button from "@/components/shared/button";
import Select from "@/components/shared/reusable-select-input";
import { assignPresenterToShow, getPlainShowInStation } from "@/lib/shows/shows";
import { AppDispatch, RootState } from "@/lib/store";
import { getShowPresenters } from "@/lib/users/users";
import { Radio, SunIcon, Users, X } from "lucide-react";
import { useParams } from "next/navigation";
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

function AssignShowPresenter({ show, section,userId }: { show?: ShowType,section:string,userId?:string }) {
  const assignPresenterModal = useRef<HTMLDialogElement>(null);
  const presenters = useSelector(
    (state: RootState) => state.users.presenterUsers
  );
  const param = useParams<{ stationId: string }>();
  const plainShows = useSelector((state: RootState) => state.shows.plainShows);

  const loading = useSelector((state: RootState) => state.shows.assigningPresenterToShow);

  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedShow, setSelectedShow] = useState<string>("");
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
    dispatch(getPlainShowInStation({ id: param.stationId }));
  }, [param.stationId, dispatch]);

  const modifiedPresenters = presenters.map((presenter) => ({
    label: presenter.fullName,
    value: presenter._id,
  }));

  const modifiedShows = plainShows.map((show) => ({
    label: show.name,
    value: show._id,
  }));

  const handleAssignPresenter = async () => {
    // Dispatch action to assign presenter to show
    console.log("Clicked");
    
    if (section === 'shows'&& (selectedUser.trim()==="" || selectedRole.trim()==="")) {
      toast.error("Please select both presenter and role");
      return;
    }else if(section==='presenters'&&(selectedShow.trim()==="" || selectedRole.trim()==="")){
      toast.error("Please select both show and role");
      return;
    }
    if(section ==='shows'){
      const data = {
        id: show!._id,
        userId: selectedUser,
        role: selectedRole,
      };
  
      console.log("Assigning presenter with data:", data);
  
      const res = await dispatch(assignPresenterToShow(data));
      if (res.meta.requestStatus === "fulfilled") {
        // toast.success("Presenter assigned successfully");
        closeModal();
      } 
    }else {
      const data = {
        id: selectedShow,
        userId: userId!,
        role: selectedRole,
      };
  
      console.log("Assigning presenter with data:", data);
  
      const res = await dispatch(assignPresenterToShow(data));
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Presenter assigned successfully");
        closeModal();
      }
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
              Assign Presenter to {section === 'presenters' ? 'Show' :show!.name }
            </h3>
            <X
              className="cursor-pointer text-red-600"
              onClick={closeModal}
              size={28}
            />
          </div>
        {
          section === 'shows'&&(
            <div className="mt-4">
            <Select
              value={selectedUser}
              onChange={(value) => setSelectedUser(value as string)}
              options={modifiedPresenters}
              label="Select Presenter"
              Icon={Users}
            />
          </div>
          )
        }
         {
          section === 'presenters'&&(
            <div className="mt-4">
            <Select
              value={selectedShow}
              onChange={(value) => setSelectedShow(value as string)}
              options={modifiedShows}
              label="Select Show"
              Icon={Radio}
            />
          </div>
          )
        }
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
