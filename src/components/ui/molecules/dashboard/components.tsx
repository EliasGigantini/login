import {
  LayoutDashboard,
  House,
  Table,
  MessageCircle,
  User,
} from "lucide-react";

export enum IconDimension {
  small = "w-6 h-6",
  medium = "w-10 h-10",
  big = "w-16 h-16",
}

export enum AnimationDuration {
  fast = "duration-200",
  medium = "duration-300",
  mediumFast = "duration-500",
  slow = "duration-1000",
}

interface Props {
  name: string | "";
  dimension: IconDimension;
  animationDuration: AnimationDuration;
}

export const DashboardIcon = ({
  name,
  dimension,
  animationDuration,
}: Props) => {
  const styling = `absolute ${dimension} ease-dash-expo transition-all ${animationDuration}`;
  switch (name) {
    case "Dashboard":
      return <LayoutDashboard className={styling} />;
    case "Posts":
      return <Table className={styling} />;
    case "Comments":
      return <MessageCircle className={styling} />;
    case "Profiles":
      return <User className={styling} />;
    default:
      return <House className={styling} />;
  }
};
