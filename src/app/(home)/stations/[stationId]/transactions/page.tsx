import StationNavigation from "@/components/stations/station-navigation"
import StationTransactionList from "@/components/transactions/station-transactions-list"

function TransactionsPage() {
    return (
        <div>
            <div className="mb-2">
            <StationNavigation />
            </div>
            <StationTransactionList />
        </div>
    )
}

export default TransactionsPage
