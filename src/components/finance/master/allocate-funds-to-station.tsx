import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import { allocateFundsToStation } from "@/lib/finance/finance";
import { AppDispatch, RootState } from "@/lib/store";
import { DollarSign, Eye, SunIcon, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

function AllocateFundsToStationModal(
    {id,stationId,mediaName}:{id:string, stationId:string, mediaName:string}
) {
    const allocateFundsModel = useRef<HTMLDialogElement>(null);
  const [allocated, setAllocated] = useState<number>(0);
  

  const loading = useSelector((state: RootState) => state.finance.loading);
  const dispatch = useDispatch<AppDispatch>();
  
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

  const handleAllocateFunds = async () => {
    if (allocated < 1000) {
      toast.error("Please select a media house and allocate at least 1000 TZS");
      return;
    }
    const data = {
      id,
      allocated,
      stationId: stationId,
    };
    const res = await dispatch(allocateFundsToStation(data));
    if (allocateFundsToStation.fulfilled.match(res)) {
      closeModal();
      setAllocated(0);
 
    }
  };
    return (
        <div>
     <button type="button" className=" text-gray-400 hover:text-gray-200 cursor-pointer">
    <Eye size={18} onClick={openModal} />
     </button>
      <dialog ref={allocateFundsModel} className="modal modal-end">
        <div className="modal-box">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Allocate Funds to {mediaName}</h3>
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
         
          <div className="flex justify-center items-center mt-6">
            {loading === "pending" ? (
              <SunIcon className="animate-spin text-white" size={24} />
            ) : (
              <Button
                onClick={handleAllocateFunds}
                disabled={allocated < 1000}
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

export default AllocateFundsToStationModal
