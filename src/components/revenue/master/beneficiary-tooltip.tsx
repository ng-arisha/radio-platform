import { Info } from "lucide-react";

function BenefiaryToolTip({ benefiaries }: { benefiaries: string[] }) {
  return (
    <div>
      <div className="group inline-block relative ml-2">
        <Info className="w-5 h-5 text-orange-400 inline cursor-pointer hover:text-orange-500" />

        {/* Hover panel */}
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block z-50 w-64 bg-neutral text-neutral-content p-3 rounded-lg shadow-lg border border-gray-700">
          <p className="font-semibold mb-2">Beneficiaries</p>
          <div className="max-h-48 overflow-y-auto text-xs space-y-1">
            {benefiaries.map((b, i) => (
              <div
                key={i}
                className="border-b border-gray-700 pb-1 break-all text-gray-300"
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BenefiaryToolTip;
