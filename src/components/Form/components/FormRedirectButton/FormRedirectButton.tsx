import React from "react";
import styles from "./FormRedirectButton.module.css";
import Button from "../../../Button";
import { FormRedirectButtonProps } from "./interface";

export const FormRedirectButton: React.FC<FormRedirectButtonProps> = (props) => {
  return (
    <Button {...props}>
      <span className={styles.textStyle}>{props.children}</span>
    </Button>
  );
};
