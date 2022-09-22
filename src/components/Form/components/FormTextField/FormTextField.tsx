import React, { useEffect, useState } from "react";
import { useFormContext } from "../../FormContext";
import { FormTextFieldProps } from "./interface";
import styles from "./FormTextField.module.css";
import { FormTextFieldInput } from "../../interface";

export const FormTextField: React.FC<FormTextFieldProps> = ({
  onValidate,
  ...inputProps
}) => {
  const { onRegisterField, onChangeField, formContext } = useFormContext();
  const [valueIsValidMessage, setValueIsValidMessage] = useState<
    string | undefined
  >(undefined);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isValueValid = checkValueforValid(event.target.value);
    onChangeField({
      name: inputProps.name,
      value: event.target.value,
      isValid: isValueValid,
    });
  };

  const checkValueforValid = (value: string) => {
    if (onValidate) {
      const isValueValid = onValidate(value);
      setValueIsValidMessage(isValueValid);
      return !Boolean(isValueValid);
    }
    return true;
  };

  useEffect(() => {
    onRegisterField({
      name: inputProps.name,
      value: "",
      isValid: false,
      errors: [],
    });
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.nameInput}>{inputProps.name}</p>
      <div
        className={`${styles.textField} ${
          valueIsValidMessage
            ? valueIsValidMessage === "required"
              ? styles.required
              : styles.error
            : null
        } `}
      >
        <input
          onChange={onChangeInput}
          className={styles.input}
          placeholder={`Enter your ${inputProps.name} please`}
          {...inputProps}
        />
      </div>
      {valueIsValidMessage && <p>{valueIsValidMessage}</p>}
      {formContext
        .find(
          (contextField: FormTextFieldInput) =>
            contextField.name === inputProps.name
        )
        ?.errors?.map((error: string) => (
          <p className={styles.errorMessage}>{error}</p>
        ))}
    </div>
  );
};
