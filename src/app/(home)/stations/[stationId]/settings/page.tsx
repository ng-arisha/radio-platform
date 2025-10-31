import StationSettings from "@/components/settings/station-settings"
import StationNavigation from "@/components/stations/station-navigation"

function SettingsPage() {
    return (
        <div>
            <div className="mb-2">
            <StationNavigation />
            </div>
            <h1 className="mb-4 text-xl text-gray-300">Customize your station</h1>
            <StationSettings />
        </div>
    )
}

export default SettingsPage
