import NewPromotionModal from "./new-promotion-modal"

function PromotionsActions() {
    return (
        <div>
            <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-medium text-white flex items-center gap-2">
                🎁 Promotions Center
              </h1>
              <p className="text-gray-400 mt-1">Create and manage all show-based promotions</p>
            </div>
            <NewPromotionModal />
          </div>
        </div>
        </div>
    )
}

export default PromotionsActions
