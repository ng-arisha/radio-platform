import MediaHouseTransactions from "@/components/media-house/media-house-transactions";

function MediaTransactionsPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">🧾</span>
          <h1 className="text-3xl font-bold">Transactions</h1>
        </div>
        <p className="text-gray-400">
          Track all financial activities within the media house
        </p>
      </div>
      <MediaHouseTransactions />
    </div>
  );
}

export default MediaTransactionsPage;
