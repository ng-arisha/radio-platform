"use client";

import { createNewPromotion } from "@/lib/promotions/promotion";
import { getShowInStation } from "@/lib/shows/shows";
import { AppDispatch, RootState } from "@/lib/store";
import { PromotionType } from "@/utils/utils";
import { CalendarPlusIcon, Gift, Plus, SunIcon, Users2, Wallet, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/button";
import Input from "../shared/input";
import Select from "../shared/reusable-select-input";

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

function NewPromotionModal() {
  const params = useParams<{ stationId: string }>();
  const newStationModal = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(1000);
  const [expiryDate, setExpiryDate] = useState("");
  const [selectedShow, setSelectedShow] = useState("");
  const [promotionType, setPromotionType] = useState(promoTypes[0].value);
  const [numberOfBeneficiaries, setNumberOfBeneficiaries] = useState(1);
  

  const dispatch = useDispatch<AppDispatch>();
  const shows = useSelector((state: RootState) => state.shows.stationShows);
  const loading = useSelector((state: RootState) => state.promotions.loading);
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

  const handleNewPromotion = async () => {
    if (!name || !amount || !expiryDate || !selectedShow || !promotionType) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const data = {
      name,
      amount,
      expiryDate: new Date(expiryDate).toISOString(),
      showId: selectedShow,
      type: promotionType,
      numberOfBeneficiaries:
        promotionType === PromotionType.FIXED_SHOW_WINNING
          ? numberOfBeneficiaries
          : undefined,
    };
    const res = await dispatch(createNewPromotion(data));
    if (createNewPromotion.fulfilled.match(res)) {
      closeModal();
      // reset fields
      setName("");
      setAmount(1000);
      setExpiryDate("");
      setSelectedShow("");
      setPromotionType("");
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
          {/* input fields */}
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
            value={promotionType}
            onChange={setPromotionType}

            />
          </div>

        {
          promotionType === PromotionType.FIXED_SHOW_WINNING && (
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

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Target Show <span className="text-red-400 ">*</span>
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

          <div className="flex justify-center items-center w-full ">
           {
            loading === 'pending' ? (
              <SunIcon className="animate-spin text-gray-400" size={24} />
            ):(
              <Button
              variant="primary"
              className="w-full"
              onClick={handleNewPromotion}
            >
              Create Promotion
            </Button>
            )
           }
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default NewPromotionModal;
