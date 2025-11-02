"use client"

import ReusableLoader from "@/components/shared/reusable-loader"
import Select from "@/components/shared/reusable-select-input"
import { getMasterRevenueStats } from "@/lib/revenue/revenue"
import { AppDispatch, RootState } from "@/lib/store"
import { formatCurrency } from "@/utils/utils"
import { CreditCard, DollarSign, Filter, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import RevenueStatCard from "./revenue-stat-card"

// export enum PeriodType {
//     DAILY = 'daily',
//     WEEKLY = 'weekly',
//     MONTHLY = 'monthly',
//     QUARTERLY = 'quarterly',
//     YEARLY = 'yearly',
//   }

const periods = [
    {
        label:"All Time",
        value:"all-time"
    },
    {
        label:"Daily",
        value:"daily"
    },
    {
        label:"Weekly",
        value:"weekly"
    },
    {
        label:"Monthly",
        value:"monthly"
    },
    {
        label:"Quarterly",
        value:"quarterly"
    },
    {
        label:"Yearly",
        value:"yearly"
    }
]

function MasterRevenueStats() {
    const dispatch = useDispatch<AppDispatch>()
    const loading = useSelector((state: RootState) => state.revenue.loading)
    const revenue = useSelector((state: RootState) => state.revenue.masterRevenueData)
    const [selectedPeriod, setSelectedPeriod] =  useState<string>(periods[0].value)

    const handleFetchMasterRevenueStats = async(period: string) => {
        await dispatch(getMasterRevenueStats({period}))
    }

    useEffect(() => {
        handleFetchMasterRevenueStats(selectedPeriod)
    }, [selectedPeriod])
    return (
        <div>
            <div className="flex justify-end items-center mb-6">
                <Select 
                value={selectedPeriod}
                onChange={setSelectedPeriod}
                options={periods}
                Icon={Filter}
                />
               

            </div>
            {
                loading === "pending" ? (
                   <ReusableLoader />
                ):(
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <RevenueStatCard 
                        Icon={DollarSign}
                        label="Total Deposits"
                        value={formatCurrency(revenue.totalDeposits)}
                        color="blue"
                        />
                         <RevenueStatCard 
                        Icon={CreditCard}
                        label="Total Payouts"
                        value={formatCurrency(revenue.totalPayout)}
                        color="red"
                        />
                        <RevenueStatCard 
                        Icon={TrendingUp}
                        label="Net Revenue"
                        value={formatCurrency(revenue.netRevenue)}
                        color="green"
                        />
                    </div>
                )
            }
        </div>
    )
}

export default MasterRevenueStats
