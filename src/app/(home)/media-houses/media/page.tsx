import MediaHousesList from "@/components/media/media-houses-list";
import NewMediaHouseModal from "@/components/media/new-media-house-modal";

function MediaPage() {
  return (
    <div>
      <div className="flex justify-between items-start">
        <h1 className="text-lg text-gray-500 font-medium">
          Media House Management
        </h1>
        <NewMediaHouseModal />
      </div>
      <MediaHousesList />
    </div>
  );
}

export default MediaPage;
