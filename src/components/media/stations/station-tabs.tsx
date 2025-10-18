import { AppDispatch, RootState } from "@/lib/store";
import { setSelectedStationtab } from "@/lib/util/util";
import { stationDetailsTabs } from "@/utils/utils";
import { useDispatch, useSelector } from "react-redux";

function StationTabs() {
    const selectedTab = useSelector((state: RootState) => state.util.selectedStationtab);
    const dispatch = useDispatch<AppDispatch>()
    const handleTabChange = (tab: string) => {
        dispatch(setSelectedStationtab(tab));
    }
    return (
         <div className="flex space-x-1 justify-start">
                    {
                        stationDetailsTabs.map((tab) => (
                            <button
                                key={tab.title}
                                className={`flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium cursor-pointer ${
                                    selectedTab === tab.title
                                        ? "bg-green-600 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                                onClick={() => handleTabChange(tab.title)}
                            >
                                <tab.Icon className="h-4 w-4" />
                                <span>{tab.title}</span>
                            </button>
                        ))
                    }
                </div>
    )
}

export default StationTabs
