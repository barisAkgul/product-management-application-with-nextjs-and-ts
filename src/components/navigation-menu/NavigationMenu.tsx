import React from "react";
import "./navigationMenu.scss";
import { MENU } from "./constants";
import Link from "next/link";

function NavigationMenu() {
  return (
    <nav className="navigation-menu-container">
      {MENU.map((item) => (
        <Link href={item.href} className="navigation-item" key={item.id}>
          <div className="icon-wrapper">{item.icon}</div>
          <p className="title">{item.title}</p>
        </Link>
      ))}
    </nav>
  );
}

export { NavigationMenu };
