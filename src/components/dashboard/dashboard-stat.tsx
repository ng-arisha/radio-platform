"use client"

import { kpiData } from "@/utils/utils";
import { DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import KPICard from "./kpi-card";

function DashboardSummary() {
    const [animatedRevenue, setAnimatedRevenue] = useState(0);
    useEffect(() => {
        const targetRevenue = kpiData.revenueToday;
        const duration = 1500;
        const steps = 60;
        const increment = targetRevenue / steps;
        let current = 0;
    
        const timer = setInterval(() => {
          current += increment;
          if (current >= targetRevenue) {
            setAnimatedRevenue(targetRevenue);
            clearInterval(timer);
          } else {
            setAnimatedRevenue(Math.floor(current));
          }
        }, duration / steps);
    
        return () => clearInterval(timer);
      }, []);
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <KPICard
            title="Revenue Today"
            value={animatedRevenue}
            percentage={kpiData.percentages.today}
            isPositive={true}
            Icon={DollarSign}
            subtitle="Last updated: 2 min ago"
          />
          <KPICard
            title="Revenue Yesterday"
            value={kpiData.revenueYesterday}
            Icon={DollarSign}
          />
          <KPICard
            title="Current Week"
            value={kpiData.currentWeek}
            percentage={kpiData.percentages.week}
            isPositive={true}
            Icon={DollarSign}
          />
          <KPICard
            title="Last Week"
            value={kpiData.lastWeek}
            Icon={DollarSign}
          />
           <KPICard
            title="Current Month"
            value={kpiData.currentMonth}
            percentage={kpiData.percentages.month}
            isPositive={true}
            Icon={DollarSign}
          />
           <KPICard
            title="Total Revenue"
            value={kpiData.totalRevenue}
            Icon={DollarSign}
          />
        </div>
    )
}

export default DashboardSummary
