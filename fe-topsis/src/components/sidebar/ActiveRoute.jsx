import Icon from "../ui/Icon";
import { useActiveRoute } from "@/utils/ActiveRouteContex";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function ActiveRoute({ name, path, icon }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { setActiveRoute } = useActiveRoute();
  
    const isActive = location.pathname === path || location.pathname.startsWith(`${path}/`);
  
    useEffect(() => {
      if (isActive) {
        setActiveRoute({ name, path, icon });
      }
    }, [isActive, name, path, icon, setActiveRoute]);
  
    const onClick = (e) => {
      e.preventDefault();
      navigate(path);
    };
    const activeClass = isActive ? "bg-orange-100  border-r-4 border-orange-600" : "";
  
    return (
      <>
        <section
          className={`${activeClass} py-3 px-12 flex gap-x-2`}
          onClick={onClick}
        >
          <Icon name={icon} size={24} color="black" />
          <Link to={path}>{name}</Link>
        </section>
      </>
    );
  }