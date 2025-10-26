import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import { allocateFundsToShow } from "@/lib/finance/finance";
import { AppDispatch, RootState } from "@/lib/store";
import { UserRole } from "@/utils/utils";
import { DollarSign, SunIcon, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

function AllocateFundsToShow(
    {
        role,
        showName,
        showId,
        financeId,
      }: {
        role: string;
        showName: string;
        showId: string;
        financeId: string;
      }
) {
    const allocateShowModel = useRef<HTMLDialogElement>(null);
    const [allocated, setAllocated] = useState<number>(0);
  
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.finance.loading);
  
    const openModal = () => {
      if (allocateShowModel.current) {
        allocateShowModel.current.showModal();
      }
    };
  
    const closeModal = () => {
      if (allocateShowModel.current) {
        allocateShowModel.current.close();
      }
    };
  
    const handleAllocateFunds = async () => {
      if (!allocated) {
        toast.error("Please enter an amount to allocate.");
        // handle error
        return;
      }
      if (role === UserRole.STATION_ADMIN) {
        const data = {
          id: financeId,
          allocated,
          showId: showId,
        };
        const res = await dispatch(allocateFundsToShow(data));
        if (res.meta.requestStatus === "fulfilled") {
          closeModal();
        }
      }
      // allocate funds logic here
    };
    return (
        <div>
        <button
        type="button"
        onClick={openModal}
          className="p-2 hover:bg-gray-700 rounded transition-colors"
          title="View Details"
        >
          <DollarSign size={16} className="text-gray-400" />
        </button>
        <dialog ref={allocateShowModel} className="modal modal-end">
          <div className="modal-box">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-gray-200 text-xl font-medium">
                Allocate Funds to {showName}
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
  
            <div className="flex justify-center items-center w-full">
              {loading === "pending" ? (
                <SunIcon className="animate-spin text-yellow-500" size={24} />
              ) : (
                <Button
                  onClick={handleAllocateFunds}
                  variant="primary"
                  className="w-full"
                >
                  Allocate Funds
                </Button>
              )}
            </div>
          </div>
        </dialog>
      </div>
    )
}

export default AllocateFundsToShow
