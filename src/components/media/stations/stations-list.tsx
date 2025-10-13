import StationTable from "@/components/stations/station-table"
import { getMediaStations } from "@/lib/stations/stations"
import { AppDispatch, RootState } from "@/lib/store"
import { SunIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

function StationsList() {
    const loading =useSelector((state:RootState)=>state.stations.loading)
    const stations =useSelector((state:RootState)=>state.stations.mediaStations)
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams<{mediaId:string}>()

    useEffect(()=>{
        dispatch(getMediaStations({id:params.mediaId}))
    },[dispatch,params.mediaId])
    return (
        <div className="mt-6">
           {
            loading === 'pending' ? (
                <div className="h-24 flex flex-col justify-center items-center">
                    <SunIcon className="animate-spin text-gray-500" size={24} />
                </div>
            ): stations.length === 0 ? (
                <div className="h-24 flex flex-col justify-center items-center">
                    <p className="text-red-500 ">There are no stations in this media house</p>
                </div>
            ):(
                <StationTable stations={stations} />
            )
           }
        </div>
    )
}

export default StationsList
