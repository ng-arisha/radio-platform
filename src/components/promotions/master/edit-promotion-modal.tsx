"use client";

import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import Select from "@/components/shared/reusable-select-input";
import { editPromotion } from "@/lib/promotions/promotion";
import { AppDispatch, RootState } from "@/lib/store";
import { PromoType } from "@/utils/utils";
import { CalendarPlusIcon, Edit, Gift, SunIcon, Users2, Wallet, X } from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const promoTypes = [
  {
    label:"Show Giveaway",
    value:"show_giveaway"
  },
  {
    label:"Fixed Show Winning",
    value:"fixed_show_winning"
  },
  
]

function EditPromotionModal({ promotion }: { promotion: PromotionType }) {
  const editPromotionModal = useRef<HTMLDialogElement>(null);

  const [name, setName] = useState(promotion.name);
  const [amount, setAmount] = useState(promotion.amount);
  const [expiryDate, setExpiryDate] = useState(
    promotion.expiryDate.slice(0, 10)
  );
  const [selectedShow, setSelectedShow] = useState(promotion.show._id);
  const [promotionType, setPromotionType] = useState(promotion.type);
  const [numberOfBeneficiaries, setNumberOfBeneficiaries] = useState(1);
 

  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.promotions.loading);
  const promotionTypes = ["bonus", "jackpot"];
  const openModal = () => {
    if (editPromotionModal.current) {
      editPromotionModal.current.showModal();
    }
  };

  const closeModal = () => {
    if (editPromotionModal.current) {
      editPromotionModal.current.close();
    }
  };

  const handleUpdatePromotion = async () => {
    const data = {
      id: promotion._id,
      name,
      amount,
      expiryDate: new Date(expiryDate).toISOString(),
      type: promotionType,
    };
    dispatch(editPromotion(data));
  };

  return (
    <div>
      <button
        type="button"
        onClick={openModal}
        className="text-blue-400 hover:text-blue-300 cursor-pointer"
      >
        <Edit size={18} />
      </button>
      <dialog ref={editPromotionModal} className="modal modal-end">
        <div className="modal-box">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg text-gray-300 font-medium">
              Edit {promotion.name} Details
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
            <div className="mb-6">
              <Input
                label="Promotion Title"
                required
                value={name}
                onChange={setName}
                type="text"
                Icon={Gift}
              />
            </div>
            <div className="mb-6">
              <Input
                label="Promotion Budget"
                required
                value={amount}
                onChange={(e) => setAmount(Number(e))}
                type="number"
                Icon={Wallet}
              />
            </div>
            <div className="mb-6">
              <Input
                label="Expiry date"
                required
                value={expiryDate}
                onChange={setExpiryDate}
                type="date"
                Icon={CalendarPlusIcon}
              />
            </div>

            <div className="mb-6">
            <Select 
            label="Promotion Type"
            options={promoTypes}
            value={promotionType ?? promoTypes[0].value}
            onChange={setPromotionType}

            />
          </div>

        {
          promotionType === PromoType.FIXED_SHOW_WINNING && (
            <div className="mb-6">
            <Input
              label="Number of Beneficiaries"
              required
              value={numberOfBeneficiaries}
              onChange={(e) => setNumberOfBeneficiaries(Number(e))}
              type="number"
              Icon={Users2}
            />
          </div>
          )
        }
            <div>
              {loading === "pending" ? (
                <SunIcon
                  className="animate-spin mx-auto text-gray-400"
                  size={24}
                />
              ) : (
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={handleUpdatePromotion}
                >
                  Update Promotion
                </Button>
              )}
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default EditPromotionModal;
