import MasterDashboard from "@/components/finance/master/master-dashboard";
import RevenueChart from "@/components/finance/master/revenue-chart";


function FinancePage() {
  return (
    <div>
      <div className="pb-6">
        <h1 className="text-xl font-medium text-gray-100">
          Master Finance Dashboard
        </h1>
        <p className="py-2 text-gray-400">
          Overview of financial performance accross all media houses
        </p>
      </div>
      <MasterDashboard />
      <RevenueChart />
    </div>
  );
}

export default FinancePage;
