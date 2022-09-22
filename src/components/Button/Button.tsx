import React from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "./intreface";

export const Button: React.FC<ButtonProps> = ({
  primary,
  className,
  icon,
  ...buttonProps
}) => {
  return (
    <button
      onClick={buttonProps.onClick}
      className={`${styles.container} 
      ${className ? className : ""} 
      ${primary ? styles.primary : ""} 
      ${buttonProps.disabled ? styles.disabled : ""}`}
      {...buttonProps}
    >
      {icon && <img src={icon} alt="Button icon" className={styles.icon} />}
      {buttonProps.children}
    </button>
  );
};
