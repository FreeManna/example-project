import React, { useEffect, useState } from "react";
import { FormContext } from "./FormContext";
import { FormTextFieldInput, FormProps, FormErrors } from "./interface";
import styles from "./Form.module.css";

export const Form: React.FC<FormProps> = (props) => {
  const [formContext, setFormContext] = useState<any>([]);

  const formSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    props.onSubmit(formContext);
  };

  const onRegisterField = (field: FormTextFieldInput) => {
    setFormContext((prevContext: FormTextFieldInput[]) => [
      ...prevContext,
      field,
    ]);
  };

  const onChangeField = (field: FormTextFieldInput) => {
    setFormContext((prevContext: FormTextFieldInput[]) =>
      prevContext.map((contextField: FormTextFieldInput) => {
        if (contextField.name !== field.name) {
          return contextField;
        }
        return field;
      })
    );
  };

  const capitalizeFirstLetter = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const setFieldsErrors = (errors: FormErrors) => {
    setFormContext((prevContext: FormTextFieldInput[]) =>
      prevContext.map((contextField: FormTextFieldInput) => ({
        ...contextField,
        errors: errors[capitalizeFirstLetter(contextField.name)],
      }))
    );
  };

  useEffect(() => {
    return () => {
      setFormContext([]);
    };
  }, []);

  useEffect(() => {
    if(props.errors) setFieldsErrors(props.errors);
  }, [props.errors]);

  return (
    <form
      onSubmit={formSubmit}
      className={`${styles.container} ${props.className}`}
    >
      <div className={styles.formFields}>
        <FormContext.Provider
          value={{ formContext, onRegisterField, onChangeField }}
        >
          {props.children}
        </FormContext.Provider>
      </div>
    </form>
  );
};
