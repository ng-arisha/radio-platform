import { updateStationStatus } from "@/lib/stations/stations";
import { AppDispatch, RootState } from "@/lib/store";
import { Power, SunIcon } from "lucide-react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/button";

function PowerOnOrOffStation({ station }: { station: StationType }) {
  const poweroffStationModal = useRef<HTMLDialogElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.stations.loading);

  const openModal = () => {
    if (poweroffStationModal.current) {
      poweroffStationModal.current.showModal();
    }
  };

  const closeModal = () => {
    if (poweroffStationModal.current) {
      poweroffStationModal.current.close();
    }
  };

  const handleStatusChange = async () => {
    const data = {
      id: station._id,
      status: station.status === "active" ? "inactive" : "active",
    };
    await dispatch(updateStationStatus(data));
  };
  return (
    <div>
      <button
        onClick={openModal}
        className="p-2 hover:bg-gray-600 rounded transition-colors cursor-pointer"
        title={station.status === "active" ? "Disable" : "Activate"}
      >
        <Power
          size={18}
          className={
            station.status === "active" ? "text-green-400" : "text-red-400"
          }
        />
      </button>
      <dialog ref={poweroffStationModal} className="modal">
        <div className="modal-box">
          <h3 className="font-medium text-lg">Station Status Upadate!</h3>
          {station.status === "active" ? (
            <div className="text-red-500">Are you sure you want to Deactivate {station.name}?</div>
          ) : (
            <div>You are about to reactivate ${station.name}</div>
          )}
          <div className="flex justify-between items-center mt-4">
            {loading === "pending" ? (
              <SunIcon className="animate-spin mb-2" size={24} />
            ) : (
              <Button onClick={handleStatusChange} className="cursor-pointer">
                {station.status === "active" ? "Deactivate" : "Activate"}
              </Button>
            )}

            <Button onClick={closeModal} variant="secondary">
              Cancel
            </Button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default PowerOnOrOffStation;
