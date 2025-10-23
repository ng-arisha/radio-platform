"use client";

import { getShowInStation } from "@/lib/shows/shows";
import { AppDispatch, RootState } from "@/lib/store";
import { DollarSign, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/button";
import Input from "../shared/input";

function AllocateFundsModal() {
  const params = useParams<{ stationId: string }>();
    const newStationModal = useRef<HTMLDialogElement>(null);
    const [allocated, setAllocated] = useState<number>(0);
    const [selectedShow, setSelectedShow] = useState("");
    const dispatch = useDispatch<AppDispatch>();
  const shows = useSelector((state: RootState) => state.shows.stationShows);
  useEffect(() => {
    dispatch(getShowInStation({ id: params.stationId }));
  }, [dispatch, params.stationId]);
    
      const openModal = () => {
        if (newStationModal.current) {
          newStationModal.current.showModal();
        }
      };
    
      const closeModal = () => {
        if (newStationModal.current) {
          newStationModal.current.close();
        }
      };

      const handleAllocateFunds = async () => {
        if (!allocated || !selectedShow) {
          // handle error
          return;
        }
        // allocate funds logic here
      }
      
    return (
        <div>
        <Button className="flex space-x-1 items-center" onClick={openModal}>
          <DollarSign size={16} />
          <span>Allocate</span>
        </Button>
        <dialog ref={newStationModal} className="modal modal-end">
          <div className="modal-box">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-gray-200 text-xl font-medium">
                Allocate Funds to a Show
              </h1>
              <button
                onClick={closeModal}
                className="btn btn-sm btn-circle btn-ghost text-red-500"
              >
                <X />
              </button>
            </div>
            {/* inputs */}
            <div className="mb-6">
            <Input
            label="Amount to Allocate"
            type="number"
            value={allocated}
            onChange={(e) => setAllocated(Number(e))}
            Icon={DollarSign}
            />
            </div>
            <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Show to be Allocated <span className="text-red-400 ">*</span>
            </label>
            <select
              id="adminstrator"
              value={selectedShow}
              onChange={(e) => setSelectedShow(e.target.value)}
              className="w-full pl-3 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select Show</option>
              {shows?.map((show) => (
                <option key={show._id} value={show._id}>
                  {show.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center items-center w-full">
              <Button onClick={handleAllocateFunds} variant="primary" className="w-full">Allocate Funds</Button>
          </div>
          </div>
        </dialog>
      </div>
    )
}

export default AllocateFundsModal
