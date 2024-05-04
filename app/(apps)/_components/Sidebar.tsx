import SidebarRoute from "./SidebarRoute";
import img from "/public/logoo.svg";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="shadow-xl bg-white h-full flex flex-col">
      <div className="flex justify-center p-6">
        <Image src={img} width={40} height={40} alt="pe" />
      </div>
      <div className="mt-12 ">
        <SidebarRoute />
      </div>
    </div>
  );
};

export default Sidebar;
