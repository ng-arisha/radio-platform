"use client";

import Input from "@/components/shared/input";
import Select from "@/components/shared/reusable-select-input";
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

  useEffect(() => {}, [randomTransaction,dispatch]);

  const handlePayouts = async () => {
    if(!selectedPromotion && randomTransaction!==null && !randomTransaction?.phoneNumber){
      toast.error("Please select a promotion and ensure a winner is selected");
    }
    const data = {
      phoneNumber: randomTransaction?.phoneNumber || "",
      amount,
      showId: params.showId,
      promotionId: selectedPromotion
    }
    await dispatch(processPayouts(data));
  }

  const modifiedPromotions = promotions.map((promotion) => ({
    label: promotion.name,
    value: promotion._id,
  }));

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
              <Select 
              value={selectedPromotion}
              onChange={setSelectedPromotion}
              options={modifiedPromotions}
              Icon={Gift}
              label="Select Promotion"
              />
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
