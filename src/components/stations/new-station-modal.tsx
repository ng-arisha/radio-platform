"use client";

import { MapPinHouse, Plus, Radio, RadioTower } from "lucide-react";
import { useRef, useState } from "react";
import Button from "../shared/button";
import Input from "../shared/input";

function NewStationModal() {
  const newStationModal = useRef<HTMLDialogElement>(null);
  const [stationName, setStationName] = useState("");
  const [address, setAddress] = useState("");
  const [frequency, setFrequency] = useState("");
  const [enabled, setEnabled] = useState(false);
  const showModal = () => {
    if (newStationModal.current) {
      newStationModal.current.showModal();
    }
  };

  const closeModal = () => {
    if (newStationModal.current) {
      newStationModal.current.close();
    }
  };
  return (
    <div>
      <Button className="flex space-x-2" onClick={showModal} variant="primary">
        <Plus className="text-background" size={20} />
        <span className="text-background">Add Station</span>
      </Button>
      <dialog ref={newStationModal} className="modal">
        <div className="modal-box">
          <h3 className="font-normal text-lg pb-3">Add New Station</h3>
          <div className="w-full h-[1px] bg-gray-400" />
          <div className="my-3">
            <Input
              value={stationName}
              onChange={setStationName}
              label="Station Name"
              type="text"
              Icon={RadioTower}
              required
              placeholder="Enter Station Name"
            />
          </div>
          <div className="my-3">
            <Input
              value={address}
              onChange={setAddress}
              label="Station Address"
              type="text"
              Icon={MapPinHouse}
              required
              placeholder="Enter Station Address"
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
              placeholder="Enter Station frequency"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="enabled"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
            />
            <label htmlFor="enabled" className="ml-2 text-sm text-gray-500">
              Station Enabled
            </label>
          </div>
          <div className="flex justify-between items-cente mt-6">
            <Button onClick={closeModal} variant="primary">
              Submit
            </Button>
            <Button onClick={closeModal} variant="secondary">
              Cancel
            </Button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default NewStationModal;
