import { SunIcon } from "lucide-react"

function ReusableLoader() {
    return (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
            <SunIcon className="animate-spin mb-2" size={24} />
            <p>Loading revenue data...</p>
        </div>
    )
}

export default ReusableLoader
