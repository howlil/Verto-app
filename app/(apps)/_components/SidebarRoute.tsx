"use client";
import { FC } from "react";
import ActiveLink from "./ActiveLink";

const routes = [
  {
    icon: "LayoutDashboard",
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    icon: "LayoutDashboard",
    href: "/kriteria",
    label: " Kriteria",
  },
  {
    icon: "LayoutDashboard",
    href: "/nilaiKriteria",
    label: "Nilai Kriteria",
  },
  {
    icon: "LayoutDashboard",
    href: "/alternatif",
    label: "Alternatif",
  },
  {
    icon: "LayoutDashboard",
    href: "/buatAnalisis",
    label: "Buat Analisis",
  },
];

const SidebarRoute: FC = () => {
  return (
    <div>
      {routes.map((route, index) => (
        <ActiveLink
          key={index}
          icon={route.icon}
          href={route.href}
          label={route.label}
        />
      ))}
    </div>
  );
};

export default SidebarRoute;
