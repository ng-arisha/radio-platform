import MediaHouseWinnersList from "@/components/users/media-house-winners"

function WinnersPageForMediaHouses() {
    return (
        <div>
             <div className="mb-4">
            <h1 className="text-3xl font-medium text-white mb-2">💰 List of Winners</h1>
            <p className="text-gray-400">Observe all winners within your medua house</p>
          </div>
           <MediaHouseWinnersList />
        </div>
    )
}

export default WinnersPageForMediaHouses
