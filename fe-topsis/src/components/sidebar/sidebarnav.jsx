import { nav } from "@/data/nav";
import ActiveRoute from "./ActiveRoute";

export default function SidebarNav() {
    return (
      <>
        {nav.map((data, i) => (
          <section  key={i}>
            <ActiveRoute href={data.href} icon={data.icon} label={data.label} />
          </section>
        ))}
      </>
    );
  }