"use client";

import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import { getAllMediaHouses } from "@/lib/media/media";
import { AppDispatch, RootState } from "@/lib/store";
import { DollarSign, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AllocateFundsModal() {
  const allocateFundsModel = useRef<HTMLDialogElement>(null);
  const [allocated, setAllocated] = useState<number>(0);
  const [selectedMediaHouse, setSelectedMediaHouse] = useState<string>("");
  const mediaHouses = useSelector((state:RootState)=>state.media.mediaHouses);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(()=>{
    dispatch(getAllMediaHouses())
  },[])
  const openModal = () => {
    if (allocateFundsModel.current) {
      allocateFundsModel.current.showModal();
    }
  };

  const closeModal = () => {
    if (allocateFundsModel.current) {
      allocateFundsModel.current.close();
    }
  };

  const handleAllocateFunds = async() => {

  }
  return (
    <div>
      <Button
        className="flex items-center gap-2 cursor-pointer"
        onClick={openModal}
      >
        <Plus size={16} />
        <span>Allocate Funds</span>
      </Button>
      <dialog ref={allocateFundsModel} className="modal modal-end">
        <div className="modal-box">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Allocate Funds</h3>
            <X
              onClick={closeModal}
              className="cursor-pointer hover:text-gray-300"
              size={20}
            />
          </div>
          <div className="mb-6">
            <Input
              label="Amount to Allocate"
              type="number"
              value={allocated}
              onChange={(e) => setAllocated(Number(e))}
              required
              Icon={DollarSign}
            />
          </div>
          <div className="my-3">
              <label className="block text-sm font-medium text-gray-300">
                Select Media House <span className="text-red-400">*</span>
              </label>
              <select
                id="station"
                value={selectedMediaHouse}
                onChange={(e) => setSelectedMediaHouse(e.target.value)}
                className="w-full pl-3 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select Media House</option>
                {mediaHouses?.map((house) => (
                  <option key={house._id} value={house._id}>
                    {house.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center items-center mt-6">
              <Button onClick={handleAllocateFunds} disabled={!selectedMediaHouse || allocated < 1000} variant="primary" className="w-full">
                Allocate Funds
              </Button>
            </div>
        </div>
      </dialog>
    </div>
  );
}

export default AllocateFundsModal;
