"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Icon from "./Icon";
interface activelink {
  icon: any;
  href: any;
  label: any;
}
const ActiveLink = ({ icon, href, label }: activelink) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname.startsWith(`${href}/`);

  const onClick = (e: any) => {
    if (e.currentTarget.tagName === "FORM") {
      e.preventDefault();
    }

    router.push(href);
  };

  const activeStyle = isActive
    ? "bg-emerald-50 border-r-4 border-r-emerald-800"
    : "";

  return (
    <Link href={href} passHref>
      <div
        onClick={onClick}
        className={`flex items-center space-x-3 py-2 px-8 hover:bg-emerald-50 hover:border-r-4 hover:border-r-emerald-800 ${activeStyle} transition-all duration-500 ease-in-out font-semibold cursor-pointer`}
      >
        <Icon name={icon} color="green" size={24} />
        <span className="text-sm text-emerald-700">{label}</span>
      </div>
    </Link>
  );
};

export default ActiveLink;
