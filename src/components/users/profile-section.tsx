"use client"

import { AppDispatch, RootState } from "@/lib/store";
import { getUserProfileData } from "@/lib/users/users";
import { formatCurrency } from "@/utils/utils";
import { Download, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/button";
import Input from "../shared/input";
import ReusableLoader from "../shared/reusable-loader";
import TextColumn from "../shared/text-column";

function ProfileSection() {
    const loading = useSelector((state:RootState) => state.users.loading);
    const dispatch = useDispatch<AppDispatch>();
    const profileData = useSelector((state:RootState) => state.users.profileData);

    const [amount,setAmount] = useState(0);

    const handleWithdrawal = () => {

    }

    useEffect(() => {
        dispatch(getUserProfileData())
    }, [dispatch]);
    return (
       <>
       {
        (loading === "pending" || profileData === null) ? (
            <ReusableLoader />
        ):(
            <div className="w-full flex mt-4 justify-center items-center">
            <div className="w-full max-w-3xl bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex flex-col items-center justify-center">
                <div className="bg-gray-200 rounded-full h-20 w-20 flex items-center justify-center mb-4">
                    <User className="h-10 w-10 text-gray-600" />
                </div>
                <h2 className="text-lg font-medium text-white mb-2">Balance: <span className="text-orange-500">{profileData.availableBalance}</span></h2>
                <h2 className="text-lg font-medium text-white mb-2">Currency: <span className="text-orange-500 uppercase">{profileData.currency}</span></h2>
                </div>


                {/* other content */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                <TextColumn label="Full Name" value={profileData.fullName} />
                <TextColumn label="Phone Number" value={profileData.phoneNumber} />
                <TextColumn label="Email" value={profileData.email} />
                <TextColumn label="Available Balance" value={formatCurrency(profileData.availableBalance)} />
                <TextColumn label="Show Name" value={profileData.showName} />
                <TextColumn label="Start Time" value={profileData.startTime} />
                <TextColumn label="End Time" value={profileData.endTime} />
                <TextColumn label="Active days" value={profileData.activedays.join(',')} />
                <TextColumn label="Commission Rate" value={`${profileData.rate}%`} />
                </div>

                {/* add an input for withdrawals */}

                <div className="my-4">
                <Input 
                value={amount}
                onChange={(e) => setAmount(Number(e))}
                label="Withdrawal Amount"
                placeholder="Enter amount to withdraw"
                type="number"
                Icon={Download}
                />
                </div>
                <div className="flex justify-center items-center w-full">
                <Button
                className="w-full"
                onClick={handleWithdrawal}>
                    Withdraw Funds
                </Button>
                </div>
            </div>
        </div>
        )
       }
       </>
    )
}

export default ProfileSection
