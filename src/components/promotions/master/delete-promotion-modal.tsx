"use client";

import Button from "@/components/shared/button";
import { deletePromotion } from "@/lib/promotions/promotion";
import { AppDispatch, RootState } from "@/lib/store";
import { SunIcon, Trash2, X } from "lucide-react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

function DeletePromotionModal({ promotion }: { promotion: PromotionType }) {
  const deletePromotionModal = useRef<HTMLDialogElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.promotions.loading);
  const openModal = () => {
    if (deletePromotionModal.current) {
      deletePromotionModal.current.showModal();
    }
  };
  const closeModal = () => {
    if (deletePromotionModal.current) {
      deletePromotionModal.current.close();
    }
  };

  const handlePromotionDeletion = async () => {
    await dispatch(deletePromotion({ id: promotion._id }));
  };

  return (
    <div>
      <button
        type="button"
        onClick={openModal}
        className="text-red-400 hover:text-red-300 cursor-pointer"
      >
        <Trash2 size={18} />
      </button>
      <dialog ref={deletePromotionModal} className="modal">
        <div className="modal-box">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg text-gray-300 font-medium">
              Delete {promotion.name}
            </h1>
            <button
              type="button"
              onClick={closeModal}
              className="text-red-500 hover:text-red-300 cursor-pointer"
            >
              <X size={26} />
            </button>
          </div>
          <div>
            <p className="text-gray-400 text-wrap">
              Are you sure you want to delete the promotion 
              <span className="font-semibold text-white">{promotion.name}</span>
              ? This action cannot be undone.
            </p>

            <div className="flex justify-center w-full items-center mt-6 gap-4">
              {loading === "pending" ? (
                <SunIcon className="animate-spin mr-2" size={24} />
              ) : (
                <Button
                  onClick={handlePromotionDeletion}
                  variant="danger"
                  className="cursor-pointer"
                >
                  Delete promotion
                </Button>
              )}
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default DeletePromotionModal;
