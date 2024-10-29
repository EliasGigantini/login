import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { DASHBOARD } from "../../../../utils/constants";
import { DashboardIcon, IconDimension, AnimationDuration } from "./components";
import { useAuth } from "../../../auth";
import { Button, buttonVariants } from "../../button";

export const Dashboard = ({}) => {
  let location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const ELEMENTS_ANIMATION_DURATION = AnimationDuration.mediumFast;
  const PARENT_ANIMATION_DURATION = AnimationDuration.medium;

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  const handleMouseHover = () => {
    setTimeout(() => {
      setOpen((prevState) => !prevState);
    }, 100);
  };

  return (
    <div className="absolute top-0 left-0 h-full w-full flex flex-row gap-8 text-black">
      <div
        className={`group h-full relative ${open ? "w-80" : "w-24"} transition-all ${PARENT_ANIMATION_DURATION} bg-cream pt-24 flex flex-col gap-8`}
        onMouseEnter={handleMouseHover}
        onMouseLeave={handleMouseHover}
      >
        <div className="relative flex flex-col items-center gap-0 h-10 overflow-hidden">
          <div
            className={`absolute h-10 w-full content-center font-medium text-4xl px-4 text-left ease-dash-expo transition-all ${ELEMENTS_ANIMATION_DURATION} leading-none ${open ? "visible translate-x-0" : "visible -translate-x-64"}`}
          >
            Dashboard
          </div>

          <div
            className={`flex content-center w-full h-full justify-center items-center ease-dash-expo transition-all ${ELEMENTS_ANIMATION_DURATION} leading-none ${open ? "invisible translate-x-64" : "translate-x-0 visible"}`}
          >
            <DashboardIcon
              name="Dashboard"
              dimension={IconDimension.small}
              animationDuration={AnimationDuration.fast}
            />
          </div>
        </div>
        <ul
          className={`h-full w-full transition-all text-center bg-cream ${ELEMENTS_ANIMATION_DURATION}`}
        >
          {DASHBOARD.map((element) => (
            <li
              key={element.name}
              className={`${location.pathname === element.href ? "font-medium bg-blu text-pure" : "hover:bg-blu/15 hover:mx-4 hover:text-blu"} ${open ? "flex justify-center content-center" : "flex items-center justify-center"} relative h-12 transition-all duration-200 text-base cursor-pointer grow p-4 overflow-hidden`}
              onClick={() => handleNavigation(element.href)}
            >
              <div
                className={`absolute w-full font-medium text-sm px-4 transition-all ${ELEMENTS_ANIMATION_DURATION} leading-none ${open ? "visible translate-x-0 text-left" : "invisible -translate-x-64 content-center"}`}
              >
                {element.name}
              </div>
              <div
                className={`flex content-center w-full h-full justify-center items-center ease-dash-expo transition-all ${ELEMENTS_ANIMATION_DURATION} leading-none ${open ? "invisible translate-x-64" : "translate-x-0 visible"}`}
              >
                <DashboardIcon
                  name={element.name}
                  dimension={IconDimension.small}
                  animationDuration={AnimationDuration.fast}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Button
        type="button"
        className="absolute top-4 right-4 z-50"
        variant={buttonVariants.ghost}
        onClick={logout}
      >
        <p className="text-sm">Log Out</p>
      </Button>
      <Outlet />
    </div>
  );
};
