"use client";

import ReusableLoader from "@/components/shared/reusable-loader";
import { getShowCommission } from "@/lib/finance/finance";
import { AppDispatch, RootState } from "@/lib/store";
import { formatCurrency } from "@/utils/utils";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShowCommissionChart from "./show-commission-chart";

function ShowCommissionDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(
    (state: RootState) => state.finance.loadingShowData
  );
  const commissionData = useSelector(
    (state: RootState) => state.finance.showCommissionData
  );
  const params = useParams<{ showId: string }>();

  useEffect(() => {
    dispatch(getShowCommission({ id: params.showId }));
  }, [dispatch]);
  return (
    <div>
      {loading === "pending" ? (
        <ReusableLoader />
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {commissionData.map((commission, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded-lg p-6 border border-gray-600"
              >
                <p className="text-gray-400 text-sm mb-2">{commission.level}</p>
                <p className="text-3xl font-bold text-white">
                  {formatCurrency(commission.commission)}
                </p>
              </div>
            ))}
          </div>
          <ShowCommissionChart commissionData={commissionData} />
        </div>
      )}
    </div>
  );
}

export default ShowCommissionDashboard;
