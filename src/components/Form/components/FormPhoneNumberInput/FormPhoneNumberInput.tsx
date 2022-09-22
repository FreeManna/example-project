import React, { useEffect, useState } from "react";
import styles from "./FormPhoneNumberInput.module.css";
import { getCountries, CountryCode, getPhoneCode } from "libphonenumber-js";
import { useFormContext } from "../../FormContext";
import { FormPhoneNumberInputProps } from "./interface";

export const FormPhoneNumberInput: React.FC<FormPhoneNumberInputProps> = ({
  onValidate,
  ...inputProps
}) => {
  const { onRegisterField, onChangeField } = useFormContext();
  const countries: CountryCode[] = getCountries();
  const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
    type: "region",
  });

  const [isOpenList, setIsOpenList] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>("UA");
  const [valueIsValidMessage, setValueIsValidMessage] = useState<
    string | undefined
  >(undefined);

  const openList = () => setIsOpenList(true);
  const closeList = () => setIsOpenList(false);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumberWithCode = `+${getPhoneCode(selectedCountry)}${
      event.target.value
    }`;
    const isValueValid = checkValueforValid(phoneNumberWithCode);
    onChangeField({
      name: inputProps.name,
      value: phoneNumberWithCode,
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

  const changeSelectedCountry = (countryCode: CountryCode) => {
    setSelectedCountry(countryCode);
    closeList();
  };

  useEffect(() => {
    onRegisterField({ name: inputProps.name, value: "", isValid: false });
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.inputName}>Phone</p>
      <div
        className={`${styles.field} ${
          valueIsValidMessage
            ? valueIsValidMessage === "required"
              ? styles.required
              : styles.error
            : null
        }`}
      >
        <button
          onClick={isOpenList ? closeList : openList}
          className={styles.button}
        >
          <img
            src={`https://countryflagsapi.com/svg/${selectedCountry.toLowerCase()}`}
            className={styles.icon}
          />
        </button>
        <p className={styles.phoneCode}>+{getPhoneCode(selectedCountry)}</p>
        <input className={styles.input} type="tel" onChange={onChangeInput} />
        {isOpenList && (
          <ul className={styles.list}>
            {countries.map((countryCode, index) => (
              <li
                key={index}
                className={styles.listItem}
                onClick={() => {
                  changeSelectedCountry(countryCode);
                }}
              >
                <img
                  className={styles.icon}
                  src={`https://countryflagsapi.com/svg/${countryCode.toLowerCase()}`}
                  alt="Icon flag of country"
                />
                <p>{regionNamesInEnglish.of(countryCode)} </p>
                <p>+{getPhoneCode(countryCode)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
