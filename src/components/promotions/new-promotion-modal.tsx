"use client";

import { Plus, X } from "lucide-react";
import { useRef } from "react";
import Button from "../shared/button";

function NewPromotionModal() {
    const newStationModal = useRef<HTMLDialogElement>(null);
    
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
    return (
        <div>
        <Button className="flex space-x-1 items-center" onClick={openModal}>
          <Plus size={16} />
          <span>New Promotion</span>
        </Button>
        <dialog ref={newStationModal} className="modal modal-end">
          <div className="modal-box">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-gray-200 text-xl font-medium">
                Create a New Promotion
              </h1>
              <button
                onClick={closeModal}
                className="btn btn-sm btn-circle btn-ghost"
              >
                <X />
              </button>
            </div>
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
          </div>
        </dialog>
      </div>
    )
}

export default NewPromotionModal
