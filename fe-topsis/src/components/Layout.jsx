import SideBarIndex from "./sidebar";
import NavbarIndex from "./NavbBar";

export default function Layout({ children }) {
  return (
    <>
      <aside className="fixed top-0  z-50  left-0">
        <SideBarIndex />
      </aside>
      <div className="ml-[276px]">
        <nav className="fixed top-0 bg-white w-full z-10 flex justify-end  right-0">
          <NavbarIndex />
        </nav>
        <main className="h-full mt-24 mr-8">{children} </main>
      </div>
    </>
  );
}
