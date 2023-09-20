"use client";

import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useState, ReactNode } from "react";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  console.log(theme);

  if (mounted) {
    return <div className={theme}>{children}</div>;
  }

  return null; // When 'mounted' is false, return null
};

export default ThemeProvider;
