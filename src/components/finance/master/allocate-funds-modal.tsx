"use client";

import Button from "@/components/shared/button";
import { Plus, X } from "lucide-react";
import { useRef } from "react";

function AllocateFundsModal() {
  const allocateFundsModel = useRef<HTMLDialogElement>(null);
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
  return (
    <div>
      <Button className="flex items-center gap-2 cursor-pointer" onClick={openModal}>
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
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
        </div>
      </dialog>
    </div>
  );
}

export default AllocateFundsModal;
