import React from "react";
import styles from "./Paper.module.css";

interface PaperProps {
  children: React.ReactNode;
}

export const Paper: React.FC<PaperProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
