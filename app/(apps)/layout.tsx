import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";

const LayoutDashboard = ({ children }: any) => {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="md-flex max-sm:hidden  h-full w-64 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-72 md:pr-10 md:pt-12 h-full">{children}</main>
    </div>
  );
};

export default LayoutDashboard;
