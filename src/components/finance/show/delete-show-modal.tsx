import Button from "@/components/shared/button";
import { deleteShow, getShowInStation } from "@/lib/shows/shows";
import { AppDispatch, RootState } from "@/lib/store";
import { SunIcon, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

function DeleteShowModal({ show }: { show: ShowType }) {
  const deleteShowModal = useRef<HTMLDialogElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.shows.deletingShow);
  const router = useRouter();
    const params = useParams<{ stationId: string }>();

  const openModal = () => {
    if (deleteShowModal.current) {
      deleteShowModal.current.showModal();
    }
  };

  const closeModal = () => {
    if (deleteShowModal.current) {
      deleteShowModal.current.close();
    }
  };

  const handleDeleteShow = async () => {
    const res = await dispatch(deleteShow({ id: show._id }));
    if (deleteShow.fulfilled.match(res)) {
      closeModal();
      router.refresh();
    }
    await dispatch(getShowInStation({ id: params.stationId, search:"", status:"", range:"" }));
  };

  return (
    <div>
      <button
        type="button"
        onClick={openModal}
        className="p-2 text-red-600 bg-red-600/10 hover:bg-red-600/50 rounded-lg transition-colors cursor-pointer"
        title="Delete Show"
      >
        <Trash2 size={18} />
      </button>
      <dialog ref={deleteShowModal} className="modal">
        <div className="modal-box">
          <p className="py-4 text-red-500 font-medium">
            Are you sure you want to delete the show{" "}
            <span className="text-gray-200">{show.name}</span>? This action
            cannot be undone.
          </p>
          <div className="flex justify-between items-center mt-4">
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            {loading === "pending" ? (
              <SunIcon className="animate-spin text-gray-200" />
            ) : (
              <Button variant="danger" onClick={handleDeleteShow}>
                Yes, Delete
              </Button>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default DeleteShowModal;
