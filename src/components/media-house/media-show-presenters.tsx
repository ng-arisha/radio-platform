import { getMediaStationShowPresenters } from "@/lib/media/media";
import { AppDispatch, RootState } from "@/lib/store";
import { formatDate } from "@/utils/utils";
import { Edit2, Power, Radio, SunIcon, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function MediaShowPresenters() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.media.loading);
  const presenters = useSelector(
    (state: RootState) => state.media.mediaShowPresenters
  );
  const params = useParams<{ mediaIdd: string }>();

  useEffect(() => {
    dispatch(getMediaStationShowPresenters({ id: params.mediaIdd }));
  }, []);
  return (
    <div>
      {loading === "pending" ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <SunIcon className="animate-spin mb-2" size={24} />
          <p>Loading show presenters...</p>
        </div>
      ) : presenters.length === 0 ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <p className="text-red-500">There are no presenters to display</p>
        </div>
      ) : (
        <div>
          <div className="bg-gray-700 rounded-lg overflow-hidden border border-gray-600">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                      Name
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                      Name
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                      Station
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                      Status
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                      Created At
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  {presenters.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-600 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full flex items-center justify-center font-semibold">
                            {item.fullName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{item.fullName}</div>
                            <div className="text-sm text-gray-400">
                              {item.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {item.fullName}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full text-sm">
                          <Radio className="w-3 h-3" />
                          {item.show?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            item.status === "active"
                              ? "bg-green-900 text-green-300"
                              : "bg-gray-600 text-gray-300"
                          }`}
                        >
                          {item.status === "active" ? "● Active" : "○ Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="p-2 hover:bg-gray-500 rounded-lg transition-colors"
                            title={
                              item.status === "active"
                                ? "Deactivate"
                                : "Activate"
                            }
                          >
                            <Power className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            className="p-2 hover:bg-gray-500 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            className="p-2 hover:bg-red-900 text-red-400 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MediaShowPresenters;
