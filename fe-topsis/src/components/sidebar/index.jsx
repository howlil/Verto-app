import Logo from "/public/our.svg"
import SidebarNav from "./sidebarnav";
export default function SideBarIndex() {
    return (
      <div className="w-[240px] shadow-lg h-screen shadow-neutral-200">
        <section className="mt-6 flex justify-center">
          <img src={Logo} alt="a" />
        </section>
        <section className="mt-12">
          <SidebarNav />
        </section>
      </div>
    );
  }
  