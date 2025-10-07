import { useQuery } from "convex/react";
import { Edit, Eye, X } from "lucide-react";
import { useRef, useState } from "react";
import { api } from "../../../convex/_generated/api";
import Button from "../shared/button";
import Input from "../shared/input";
import TextColumn from "../shared/text-column";

function ViewShowDetails({
  show,
  purpose,
}: {
  show: ShowsType;
  purpose: string;
}) {
  const viewShowDetails = useRef<HTMLDialogElement>(null);
  const [code, setCode] = useState(show.code);
  const [startTime, setStartTime] = useState(show.startTime);
  const [endTime, setEndTime] = useState(show.endTime);
  const [name, setName] = useState(show.name);
  const [jackpotEnabled, setJackpotEnabled] = useState(show.jackpotEnabled);
  const [stationId, setStationId] = useState(show.stationId);
  const stations = useQuery(api.stations.get);
  const closeModal = () => {
    if (viewShowDetails.current) {
      viewShowDetails.current.close();
    }
  };
  const openModal = () => {
    if (viewShowDetails.current) {
      viewShowDetails.current.showModal();
    }
  };
  return (
    <div>
      <button
        onClick={openModal}
        className={`p-2 cursor-pointer ${purpose === "view" ? "text-green-500" : "text-yellow-500"} mr-2 rounded-md`}
      >
        {purpose === "view" ? (
          <Eye className="" size={16} />
        ) : (
          <Edit className="" size={16} />
        )}
      </button>
      <dialog ref={viewShowDetails} className="modal modal-end">
        <div className="modal-box">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-normal py-2">
              {purpose === "view"
                ? `View ${show.name} Details`
                : `Edit ${show.name} Details`}
            </h3>

            <X
              className="cursor-pointer text-gray-400 hover:text-gray-200"
              size={20}
              onClick={closeModal}
            />
          </div>
          {purpose === "view" ? (
            <>
              <div className="w-full h-[0.5px] bg-gray-400 mb-4" />

              {show.stationName && (
                <div className="mb-4">
                  <TextColumn
                    label="Associated station"
                    value={show.stationName}
                  />
                </div>
              )}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <TextColumn label="Show Name" value={show.name} />
                <TextColumn label="Show Code" value={show.code} />
                <TextColumn label="Start Time" value={show.startTime} />
                <TextColumn label="End Time" value={show.endTime} />
                <TextColumn
                  label="Jackpot Enabled"
                  value={show.jackpotEnabled ? "Yes" : "No"}
                />
                <TextColumn
                  label="Created At"
                  value={new Date(show._creationTime).toLocaleDateString()}
                />
              </div>
            </>
          ) : (
            <>
             <div className="my-3">
              <label className="block text-sm font-medium text-gray-300">
                Select Station <span className="text-red-400">*</span>
              </label>
              <select
                id="station"
                value={stationId}
                onChange={(e) => setStationId(e.target.value)}
                className="w-full pl-3 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select Station</option>
                {stations?.map((station) => (
                  <option key={station._id} value={station._id}>
                    {station.name}
                  </option>
                ))}
              </select>
            </div>
              <div className="my-3">
                <Input
                  value={name}
                  onChange={setName}
                  label="Show Name"
                  type="text"
                />
              </div>
              <div className="my-3">
                <Input
                  value={code}
                  onChange={setCode}
                  label="Show Code"
                  type="text"
                />
              </div>

              <div className="my-3 flex justify-between items-center space-x-2 w-full">
                <div className="w-full">
                  <Input
                    value={startTime}
                    onChange={setStartTime}
                    label="Start Time"
                    type="time"
                  />
                </div>
                <div className="w-full">
                  <Input
                    value={endTime}
                    onChange={setEndTime}
                    label="End Time"
                    type="time"
                  />
                </div>
              </div>
              <div className="flex items-center">
            <input
              type="checkbox"
              id="enabled"
              checked={jackpotEnabled}
              onChange={(e) => setJackpotEnabled(e.target.checked)}
              className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
            />
            <label htmlFor="enabled" className="ml-2 text-sm text-gray-500">
            Jackpot Enabled
            </label>
          </div>
          <div className="flex justify-center items-center">
            <Button variant="primary" className="w-full mt-4" onClick={closeModal}>
              Update
            </Button>
          </div>
            </>
          )}
          {/* <div className="flex justify-center items-center">
            <Button variant="secondary" className="w-full" onClick={closeModal}>
              Close
            </Button>
          </div> */}
        </div>
      </dialog>
    </div>
  );
}

export default ViewShowDetails;
