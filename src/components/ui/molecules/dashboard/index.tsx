import { useState } from "react";
import { DASHBOARD } from "../../../../utils/constants";
import { LayoutDashboard, House, Table } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const Dashboard = ({}) => {
  let location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  const getIcon = (name: string) => {
    // const styling = `h-8 w-8 transition-all duration-300 ${open ? "translate-x-14 opacity-1" : "-translate-x-5 opacity-1"}`;
    const styling = `absolute h-6 w-6 content-center text-center transition-all duration-200 ${open ? "translate-y-6 visible" : "visible translate-y-0"}`;
    switch (name) {
      case "Dashboard":
        return <LayoutDashboard className={styling} />;
      case "Table":
        return <Table className={styling} />;
      default:
        return <House className={styling} />;
    }
  };

  return (
    <div className="absolute top-0 left-0 h-full w-full flex flex-row gap-8 text-black">
      <div
        className="group h-full w-24 hover:w-80 transition-all duration-300 bg-cream pt-24 flex flex-col gap-8"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="relative flex flex-col items-center gap-0 h-10 overflow-hidden">
          <div
            className={`absolute h-10 w-full content-center font-medium text-4xl px-4 text-right transition-all duration-200 leading-none ${open ? "visible translate-y-0" : "-translate-y-10 invisible"}`}
          >
            Dashboard
          </div>
          <div
            className={`absolute h-10 w-full content-center font-medium text-base px-4 text-center transition-all duration-200 leading-none ${open ? "translate-y-10 invisible" : "visible translate-y-0"}`}
          >
            DASH
          </div>
        </div>
        <ul className="h-full w-full transition-all duration-300 text-center bg-cream">
          {DASHBOARD.map((element) => (
            <li
              key={element.name}
              className={`${location.pathname === element.href ? "font-medium bg-blu text-pure" : ""} ${open ? "" : "flex items-center justify-center"} h-12 transition-all duration-200 text-base cursor-pointer grow p-4`}
              onClick={() => handleNavigation(element.href)}
            >
              <div
                className={`w-full h-8 leading-none flex ${open ? "text-base justify-end" : "text-xs justify-center items-center"}`}
              >
                {element.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </div>
  );
};
