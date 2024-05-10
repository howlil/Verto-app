import { nav } from "@/data/nav";
import ActiveRoute from "./ActiveRoute";

export default function SidebarNav() {
    return (
      <>
        {nav.map((data, i) => (
          <section key={i}>
            <ActiveRoute path={data.path} icon={data.icon} name={data.name} />
          </section>
        ))}
      </>
    );
  }