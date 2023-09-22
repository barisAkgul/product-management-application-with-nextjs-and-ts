"use client";

import React, { useContext, useState } from "react";
import styles from "./themeToggle.module.css";
import { ThemeContext, useTheme } from "@/context/ThemeContext";

import { BsFillSunFill, BsMoonFill } from "react-icons/bs";

const ThemeToggle: React.FC = () => {
  const { theme, toggle } = useTheme();

  return (
    <>
      <div className={styles.container} onClick={() => toggle()}>
        <div className={styles.icon}>🌙</div>
        <div className={styles.icon}>🔆</div>
        <div
          className={styles.ball}
          style={theme === "dark" ? { left: "2px" } : { right: "2px" }}
        />
      </div>
      {/* <div className={styles.container} onClick={() => toggle()}>
        {theme === "dark" ? <BsFillSunFill /> : <BsMoonFill />}
      </div> */}
    </>
  );
};

export default ThemeToggle;
