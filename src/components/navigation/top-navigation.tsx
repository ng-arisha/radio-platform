import { MenuIcon } from "lucide-react";

function TopNavigation() {
  return (
    <div className="navbar bg-gray-900/90 shadow-sm">
      <div className="flex-1">
      <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
        <MenuIcon size={20} />
        </label>
        {/* <a className="cursor-pointer text-gray-500 text-xl">TRN</a> */}

      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Link</a>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TopNavigation;
