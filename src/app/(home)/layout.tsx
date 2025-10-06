import SideNavigation from "@/components/navigation/side-navigation";
import TopNavigation from "@/components/navigation/top-navigation";

function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        
      {/* top navigation */}
      <TopNavigation />
        {/* main content */}
        <div className="px-4 py-6 flex-1 min-h-screen bg-gray-900 overflow-y-auto">
            {children}
        </div>
      </div>
    {/* side navigation */}
    <SideNavigation />
    </div>
  );
}

export default HomeLayout;
