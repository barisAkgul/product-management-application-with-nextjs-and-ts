import React from "react";

import "./sidebar.scss";
import Logo from "../logo/Logo";
import { NavigationMenu } from "../navigation-menu/NavigationMenu";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <Logo />
      <NavigationMenu />
    </div>
  );
};

export default Sidebar;
