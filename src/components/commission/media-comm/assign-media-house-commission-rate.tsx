"use client";

import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import { setMediaHouseCommissionRate } from "@/lib/commission/commission";
import { AppDispatch, RootState } from "@/lib/store";
import { Edit, Percent, SunIcon, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

function AssignMediaHouseCommissionRtae({ item }: { item: StationsCommissionType }) {
    const setCommissionRateModal = useRef<HTMLDialogElement>(null);

    const [rate, setRate] = useState<number>(item.commissionRate);
  
    const loading = useSelector((state: RootState) => state.commission.loading);
    const dispatch = useDispatch<AppDispatch>();
  
    const openModal = () => {
      if (setCommissionRateModal.current) {
        setCommissionRateModal.current.showModal();
      }
    };
  
    const closeModal = () => {
      if (setCommissionRateModal.current) {
        setCommissionRateModal.current.close();
      }
    };
  
    const handleUpdateRate = async () => {
      if (!rate || rate < 0 || rate > 100) {
        // handle error
        toast.error("Please enter a valid commission rate between 0 and 100.");
        return;
      }
      const data = {
        id: item.commissionId,
        rate,
      };
      await dispatch(setMediaHouseCommissionRate(data));
      closeModal();
    };
    return (
        <div>
      <button
        type="button"
        onClick={openModal}
        className="p-2 hover:bg-gray-700 rounded transition-colors"
        title="View Details"
      >
        <Edit size={16} className="text-gray-400" />
      </button>

      <dialog ref={setCommissionRateModal} className="modal modal-end">
        <div className="modal-box">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-gray-200 text-xl font-medium">
              Modify commission rate for {item.stationName}
            </h1>
            <button
              onClick={closeModal}
              className="btn btn-sm btn-circle btn-ghost text-red-500"
            >
              <X />
            </button>
          </div>
          <div className="my-4">
            <Input
              label="Commission Rate (%)"
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e))}
              Icon={Percent}
            />
          </div>

          <div className="flex justify-center items-center gap-4 mt-6">
            {loading === "pending" ? (
              <SunIcon className="animate-spin text-gray-400" size={24} />
            ) : (
              <Button className="w-full" onClick={handleUpdateRate}>
                Apply Changes
              </Button>
            )}
          </div>
        </div>
      </dialog>
    </div>
    )
}

export default AssignMediaHouseCommissionRtae
