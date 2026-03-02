import CustomerCareList from "@/components/cs/customer-care-list";
import NewCustomerCareModal from "@/components/cs/new-customer-care";
import StationNavigation from "@/components/stations/station-navigation";

function CustomerCares() {
  return (
    <div>
      <div className="mb-2">
        <StationNavigation />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white">Customer Cares</h1>
        <NewCustomerCareModal />
      </div>

      <CustomerCareList />
    </div>
  );
}

export default CustomerCares;
