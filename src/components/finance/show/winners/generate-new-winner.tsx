"use client";

import Input from "@/components/shared/input";
import { getRandomTransaction, getShowPromotions } from "@/lib/shows/shows";
import { AppDispatch, RootState } from "@/lib/store";
import { processPayouts } from "@/lib/transactions/transaction";
import { Award, Gift, SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

function GenerateNewWinner() {
  const dispatch = useDispatch<AppDispatch>();
  const [amount, setAmount] = useState<number>(0);
  const [selectedPromotion, setSelectedPromotion] = useState<string>("");
  const promotions = useSelector(
    (state: RootState) => state.shows.showPromotions
  );
  const loading = useSelector((state: RootState) => state.shows.loading);
  const handlingPayouts = useSelector((state:RootState) => state.transactions.loading);
  const randomTransaction = useSelector(
    (state: RootState) => state.shows.randomShowTransaction
  );
  const params = useParams<{ showId: string }>();
  const handleSelectWinner = async () => {
    const res = await dispatch(getRandomTransaction({ id: params.showId }));
    if (getRandomTransaction.fulfilled.match(res)) {
      console.log("Random Transaction Selected:", res.payload);
      // You can add more logic here to display the winner or notify users
    }
  };

    useEffect(() => {
      dispatch(getShowPromotions({ id: params.showId }));
    }, [dispatch]);

  useEffect(() => {}, [dispatch]);

  const handlePayouts = async () => {
    if(selectedPromotion.trim()==="" || (randomTransaction!==null && !randomTransaction?.phoneNumber)){
      toast.error("Please select a promotion and ensure a winner is selected");
      return;
    }
    const data = {
      phoneNumber: randomTransaction?.phoneNumber || "",
      amount,
      showId: params.showId,
      promotionId: selectedPromotion
    }

    console.log("Payout Data:", data);
    await dispatch(processPayouts(data));
  }

  const modifiedPromotions = promotions.map((promotion) => ({
    label: promotion.name,
    value: promotion._id,
  }));

  console.log("Modified Promotions:", modifiedPromotions);

  return (
    <div>
      <div className="space-y-6">
        <h2 className="text-2xl font-medium text-white">
          Random Winner Selector
        </h2>

        {loading === "pending" ? (
          <div className="bg-gradient-to-br from-purple-600 to-orange-600 rounded-lg p-8 text-center space-y-4">
            <div className="animate-spin text-6xl">🎰</div>
            <p className="text-white text-2xl font-bold animate-pulse">
              Selecting Winner...
            </p>
          </div>
        ) : randomTransaction ? (
            <div className="space-y-4 flex justify-center flex-col items-center">
            <div className="text-6xl animate-bounce">🎉</div>
            <h3 className="text-3xl font-bold text-white">Congratulations!</h3>
            <div className="bg-gray-700 max-w-md bg-opacity-20 rounded-lg p-6 backdrop-blur-sm">
              
              <p className="text-white text-opacity-80 mb-2">{randomTransaction.phoneNumber}</p>
              {/* <Select 
              value={selectedPromotion}
              onChange={(value) => setSelectedPromotion(value)}
              options={modifiedPromotions}
              Icon={Gift}
              label="Select Promotion"
              /> */}
              <div>
              <label className="block text-sm font-medium text-gray-300">
          Select Promotion <span className="text-red-400">*</span>
        </label>
              <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Gift className="h-5 w-5 text-gray-400" />
          </div>
        <select
          value={selectedPromotion}
          onChange={(e) => setSelectedPromotion(e.target.value)}
          className={`w-full pl-10 pr-10 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 appearance-none`}
        >
          <option value="" disabled hidden>
              No selected promotion
            </option>
          {promotions.map((opt) => (
            <option key={opt._id} value={opt._id}>
              {opt.name}
            </option>
          ))}
        </select>
        {/* Dropdown indicator */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="h-4 w-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 12a1 1 0 0 1-.707-.293l-3-3a1 1 0 1 1 1.414-1.414L10 9.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3A1 1 0 0 1 10 12z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
              </div>
             <div className="mt-4 ">
                <Input 
                label="Reward Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e))}
                Icon={Gift}
                />
             </div>
            </div>
            <div className="flex gap-3 justify-center">
              <button 
              type="button"
                onClick={handleSelectWinner}
                className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition font-semibold"
              >
                Regenerate Winner
              </button>
             {
              handlingPayouts === "pending" ? (
                <SunIcon className="animate-spin text-white" size={32} />
              ):(
                <button
                type="button"
                onClick={handlePayouts}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">
                  Send Reward
                </button>
              )
             }
            </div>
          </div>
        ):(
          <div className="bg-gradient-to-br from-purple-600 to-orange-600 rounded-lg p-8 text-center">
            <div className="space-y-4">
              <Award size={64} className="mx-auto text-white" />
              <h3 className="text-2xl font-bold text-white">
                Ready to Pick a Winner?
              </h3>
              <button
              type="button"
                onClick={handleSelectWinner}
                className="px-8 py-4 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🎉 Select Winner
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GenerateNewWinner;
