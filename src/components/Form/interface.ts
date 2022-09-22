import React from "react";

export interface FormTextFieldInput {
  name: string;
  value: string;
  isValid: boolean;
  errors?: string[];
}

 export interface FormErrors{
  [key: string]: string[];
}
export interface FormProps {
  className?: string;
  onSubmit: (arg0: any) => void;
  children: React.ReactNode;
  errors?: FormErrors;
}
