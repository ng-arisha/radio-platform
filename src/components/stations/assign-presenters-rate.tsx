"use client";

import { assignPresenterPaymentRate } from "@/lib/commission/commission";
import { AppDispatch, RootState } from "@/lib/store";
import { SunIcon, Wallet, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/button";
import Input from "../shared/input";

function AssignPresentersPaymentrates({ user }: { user: StationPresenters }) {
  const assignPresnterPaymentModal = useRef<HTMLDialogElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.commission.loading);

  const [rate, setRate] = useState<number>(0);

  const openModal = () => {
    if (assignPresnterPaymentModal.current) {
      assignPresnterPaymentModal.current.showModal();
    }
  };

  const closeModal = () => {
    if (assignPresnterPaymentModal.current) {
      assignPresnterPaymentModal.current.close();
    }
  };

  const handleCommissionAssignment = async () => {
    if (rate <= 0) {
      toast.error("Please enter a valid payment rate.");
      return;
    }

    const data = {
      id: user.commissionId,
      rate,
    };
    const res = await dispatch(assignPresenterPaymentRate(data));
    if (res.meta.requestStatus === "fulfilled") {
      closeModal();
    }
  };
  return (
    <div>
      <button
        onClick={openModal}
        type="button"
        className="p-2 hover:bg-gray-700 rounded transition-colors cursor-pointer"
        title="Assign Payment Rate"
      >
        <Wallet size={16} className="text-gray-400" />
      </button>
      <dialog ref={assignPresnterPaymentModal} className="modal">
        <div className="modal-box">
          <div className="flex justify-between items-center mb-4 gap-8">
            <h3 className="font-medium text-lg">
              Assign Payment Rate to {user.user.fullName}
            </h3>

            <X
              className="text-red-500 cursor-pointer"
              size={28}
              onClick={closeModal}
            />
          </div>
          <Input
            value={rate}
            onChange={(e) => setRate(Number(e))}
            label="Payment Rate (%)"
            type="number"
            placeholder="Enter payment rate"
            Icon={Wallet}
          />
          <div className="flex justify-center items-center mt-6 w-full">
            {loading === "pending" ? (
              <SunIcon className="animate-spin text-gray-100" size={32} />
            ) : (
              <Button
                className="w-full"
                variant="primary"
                onClick={handleCommissionAssignment}
              >
                Assign
              </Button>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default AssignPresentersPaymentrates;
