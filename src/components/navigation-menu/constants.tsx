import { ReactNode } from "react";
import { RxDashboard } from "react-icons/rx";
import { RiTaskLine, RiSettings5Line } from "react-icons/ri";
import { AiOutlineProject } from "react-icons/ai";

type MenuItem = {
  id: number;
  icon: ReactNode;
  title: string;
  href: string;
};

export const MENU: MenuItem[] = [
  {
    id: 0,
    icon: <RxDashboard />,
    title: "Dashboard",
    href: "/",
  },
  {
    id: 1,
    icon: <RiTaskLine />,
    title: "Products",
    href: "/products",
  },
  {
    id: 2,
    icon: <AiOutlineProject />,
    title: "Orders",
    href: "/",
  },
  {
    id: 3,
    icon: <RiSettings5Line />,
    title: "Users",
    href: "/",
  },
];
