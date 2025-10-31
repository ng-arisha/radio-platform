import PresenterActions from "@/components/stations/presenter-actions"
import PresentersList from "@/components/stations/presenters-list"
import StationNavigation from "@/components/stations/station-navigation"

function PresentersPage() {
    return (
        <div>
             <div className="mb-2">
            <StationNavigation />
            </div>
           <PresenterActions />
           
           <PresentersList />
        </div>
    )
}

export default PresentersPage
