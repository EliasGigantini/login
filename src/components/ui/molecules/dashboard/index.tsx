import { DASHBOARD } from "../../../../utils/constants";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const Dashboard = ({}) => {
  let location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  return (
    <div className="absolute top-0 left-0 h-full w-full flex flex-row gap-8 text-black">
      <div className="h-full w-80 bg-cream pt-24 flex flex-col gap-8">
        <h2 className="font-medium text-4xl text-right px-4">Dashboard</h2>
        <ul className="h-full w-full text-right bg-cream">
          {DASHBOARD.map((element) => (
            <li
              key={element.name}
              className={`${location.pathname === element.href ? "font-medium bg-pure" : ""} text-base cursor-pointer grow p-4`}
              onClick={() => handleNavigation(element.href)}
            >
              {element.name}
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </div>
  );
};
