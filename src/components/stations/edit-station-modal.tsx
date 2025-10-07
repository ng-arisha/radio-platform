import { useMutation } from "convex/react";
import { Edit2, LocationEditIcon, Radio, Sun } from "lucide-react";
import { useRef, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import Button from "../shared/button";
import Input from "../shared/input";

function EditStationModal({station}:{station:StationType}) {
  const editStationModal = useRef<HTMLDialogElement>(null);
  const [stationName, setStationName] = useState(station.name);
    const [address, setAddress] = useState(station.address);
    const [frequency, setFrequency] = useState(station.frequency);
    const [enabled, setEnabled] = useState(station.enabled);
    const [isLoading, setIsLoading] = useState(false);

    const updateStation = useMutation(api.stations.updateById);
  const closeModal = () => {
    if (editStationModal.current) {
      editStationModal.current.close();
    }
  };

  const openModal = () => {
    if (editStationModal.current) {
      editStationModal.current.showModal();
    }
  };

  const handleUpdateStation = async () => {
    setIsLoading(true);
    const data = {
        id:station._id as Id<"stations">,
        name: stationName,
        address,
        frequency,
        enabled,
    }
    await updateStation(data);
    setIsLoading(false);
    closeModal();
  }
  return (
    <div>
      <button
        type="button"
        className="p-2 cursor-pointer text-green-500 mr-2 rounded-md"
        onClick={openModal}
      >
        <Edit2 className="mr-1" size={16} />
      </button>
      <dialog ref={editStationModal} className="modal modal-end">
        <div className="modal-box">
          <h3 className="text-lg font-normal py-2">Update {station.name} Station</h3>
          <div className="w-full h-[1px] bg-gray-400" />
          <div className="my-3">
            <Input 
            value={stationName}
            onChange={setStationName}
            label="Station Name"
            type="text"
            Icon={Radio}
            required
            />
          </div>
          <div className="my-3">
            <Input 
            value={address}
            onChange={setAddress}
            label="Station Address"
            type="text"
            Icon={LocationEditIcon}
            required
            />
          </div>
          <div className="my-3">
            <Input 
            value={frequency}
            onChange={setFrequency}
            label="Frequency"
            type="text"
            Icon={Radio}
            required
            />
          </div>
            <div className="my-3">
                <label className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() => setEnabled(!enabled)}
                    className="h-4 w-4 text-orange-400 bg-gray-700 border-gray-600 rounded focus:ring-orange-400 focus:ring-2"
                />
                <span className="text-gray-300">Enable Station?</span>
                </label>
            </div>
          <div className="flex justify-between items-center">
           {
            isLoading ?  (
                <Sun className="animate-spin text-orange-400" />
            ):(
                <Button onClick={handleUpdateStation} variant="primary">
                Update
              </Button>
            )
           }
            <Button onClick={closeModal} variant="secondary">
              Cancel
            </Button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default EditStationModal;
