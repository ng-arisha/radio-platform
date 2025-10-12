import MediaHousesList from "@/components/media/media-houses-list";

function MediaPage() {
  return (
    <div>
      <div className="flexx justify-between items-start">
        <h1 className="text-lg text-gray-500 font-medium">
          Media House Management
        </h1>
      </div>
      <MediaHousesList />
    </div>
  );
}

export default MediaPage;
