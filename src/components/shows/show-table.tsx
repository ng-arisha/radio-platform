"use client";

import { useMutation } from "convex/react";
import {
    SunIcon,
    ThumbsDownIcon,
    ThumbsUpIcon,
    Trash2Icon,
} from "lucide-react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import ViewShowDetails from "./view-show-details";

function ShowTable({ shows }: { shows: ShowsType[] }) {
  const deleteShow = useMutation(api.shows.deleteShow);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteShow = async (id: string) => {
    setIsDeleting(true);
    await deleteShow({ id: id as Id<"shows"> });
    setIsDeleting(false);
  };
  return (
    <div className="overflow-x-auto rounded-box border border-gray-800 bg-gray-900/80">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className="text-gray-400 uppercase font-normal">#</th>
            <th className="text-gray-400 uppercase font-normal">Show Name</th>
            <th className="text-gray-400 uppercase font-normal">Code</th>
            <th className="text-gray-400 uppercase font-normal">Start Time</th>
            <th className="text-gray-400 uppercase font-normal">End Time</th>
            <th className="text-gray-400 uppercase font-normal">Created At</th>
            <th className="text-gray-400 uppercase font-normal">
              Jackpot Enabled?
            </th>
            <th className="text-gray-400 uppercase font-normal">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {shows.map((show, index) => (
            <tr key={show._id}>
              <th>{index + 1}</th>
              <td>{show.name}</td>
              <td>{show.code}</td>
              <td>{show.startTime}</td>
              <td>{show.endTime}</td>
              <td>{new Date(show._creationTime).toLocaleDateString()}</td>
              <td>
                {show.jackpotEnabled ? (
                  <p className="py-1 px-2 rounded-full bg-green-500/30 text-green-500 flex justify-center items-center w-fit">
                    <ThumbsUpIcon className="mr-1" size={16} />
                    <span>Yes</span>
                  </p>
                ) : (
                  <p className="py-1 px-2 rounded-full bg-red-500/30 text-red-500 flex justify-center items-center w-fit">
                    <ThumbsDownIcon className="mr-1" size={16} />
                    <span>Disabled</span>
                  </p>
                )}
              </td>

              <td className="flex space-x-1 items-center">
                <ViewShowDetails show={show} purpose="edit" />
                <ViewShowDetails show={show} purpose="view" />
                {isDeleting ? (
                  <SunIcon className="animate-spin text-red-500" size={16} />
                ) : (
                  <button
                    onClick={() => handleDeleteShow(show._id)}
                    type="button"
                    className="p-2 cursor-pointer text-red-500 rounded-md"
                  >
                    <Trash2Icon className="" size={16} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowTable;
