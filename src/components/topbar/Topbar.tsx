import React from "react";
import "./topbar.scss";
import ThemeToggle from "../DarkModeToggle/ThemeToggle";
import { Prociono } from "next/font/google";
import { ProfileButton } from "../profile-button/ProfileButton";

const Topbar = () => {
  return (
    <div className="topbar-container">
      {" "}
      <ThemeToggle />
      <ProfileButton />
    </div>
  );
};

export default Topbar;
