import SideBarIndex from "./sidebar";
import NavbarIndex from "./NavbBar";

export default function Layout({ children }) {
    return (
      <>
        <aside className="fixed top-0 left-0">
          <SideBarIndex />
        </aside>
        <div className="ml-[276px]">
          <nav className="fixed top-0 right-0">
            <NavbarIndex />
          </nav>
          <main className="h-full mt-20">{children}</main>
        </div>
      </>
    );
  }