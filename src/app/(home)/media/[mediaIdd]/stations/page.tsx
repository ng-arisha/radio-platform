import StationSummaryInfo from "@/components/media-house/station-summary-info"
import NewStationModal from "@/components/stations/new-station-modal"

function MediaStationPage() {
    return (
        <div>
           <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-medium mb-2">Stations Management</h1>
            <p className="text-gray-400">Manage all stations within the media house</p>
          </div>
         <NewStationModal page="stations" />
        </div>

        <StationSummaryInfo />
        </div>
    )
}

export default MediaStationPage
