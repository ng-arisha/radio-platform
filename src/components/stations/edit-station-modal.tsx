import { editStation } from "@/lib/stations/stations";
import { AppDispatch, RootState } from "@/lib/store";
import { useMutation } from "convex/react";
import { Edit2, LocationEditIcon, Radio, Sun } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../../convex/_generated/api";
import Button from "../shared/button";
import Input from "../shared/input";

function EditStationModal({station}:{station:StationType}) {
  const editStationModal = useRef<HTMLDialogElement>(null);
  const [stationName, setStationName] = useState(station.name);
    const [address, setAddress] = useState(station.address);
    const [frequency, setFrequency] = useState(station.frequency);
    const [enabled, setEnabled] = useState(station.status);
    const [isLoading, setIsLoading] = useState(false);
    const loading = useSelector((state:RootState)=>state.stations.addingStation);
    const dispatch = useDispatch<AppDispatch>();
    const [selectedUser, setSelectedUser] = useState("");
    const stationUsers = useSelector((state:RootState)=>state.users.stationAdminUsers);
    const params = useParams<{ mediaId: string }>();

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
        id:station._id,
        name: stationName,
        address,
        frequency,
        status:enabled,
        userId:selectedUser || station.user._id,
        mediaHouseId: params.mediaId,
    }
    const res = await dispatch(editStation(data));
    if(editStation.fulfilled.match(res)){
      closeModal();
    }
    
  }
  return (
    <div>
      <button
        type="button"
        className="p-2 cursor-pointer text-green-500 mr-2 rounded-md"
        onClick={openModal}
      >
        <Edit2 className="" size={16} />
      </button>
      <dialog ref={editStationModal} className="modal modal-end">
        <div className="modal-box">
          <h3 className="text-lg font-normal py-2">Update {station.name} Station</h3>
          <div className="w-full h-[1px] bg-gray-400" />
          <div className="my-3">
              <label className="block text-sm font-medium text-gray-300">
                Select Adminstrator <span className="text-red-400">*</span>
              </label>
              <select
                id="adminstrator"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full pl-3 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select User</option>
                {stationUsers?.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.fullName}
                  </option>
                ))}
              </select>
            </div>
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
                    checked={enabled === 'active'}
                    onChange={() => setEnabled(enabled === 'active' ? 'inactive' : 'active')}
                    className="h-4 w-4 text-orange-400 bg-gray-700 border-gray-600 rounded focus:ring-orange-400 focus:ring-2"
                />
                <span className="text-gray-300">Enable Station?</span>
                </label>
            </div>
          <div className="flex justify-between items-center">
           {
            loading === 'pending' ?  (
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
