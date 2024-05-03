import SideBar from "./_components/SideBar";
import Navbar from "./_components/Navbar";

export default function Layout({children}) {
  return (
    <div>
      <SideBar />
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
}
