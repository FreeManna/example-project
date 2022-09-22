import { isPossiblePhoneNumber, isValidPhoneNumber } from "libphonenumber-js";

export default class ValidateService {
  static composeValidators(...validators: any) {
    return (value: string) => {
      return validators.reduce(
        (error: any, validator: any) => error || validator(value),
        undefined
      );
    };
  }

  static required(value: string) {
    return value ? undefined : "required";
  }

  static emailValidator(email: string) {
    const emailRegExp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegExp.test(email) ? undefined : "Email is incorrect";
  }

  static usernameValidator(login: string) {
    const loginRegExp = /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/;
    return loginRegExp.test(login)
      ? undefined
      : "Login is incorrect. It must have min 6 chapters";
  }

  static passwordValidator(password: string) {
    const passwrodRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return passwrodRegExp.test(password)
      ? undefined
      : "Password is incorrect. It's must have min 8 chapters and 1 number. Chapter camel and lower register";
  }

  static checkPasswordEqualsConfirmationPassword(
    password: string,
    confirmationPassword: string
  ) {
    return password === confirmationPassword;
  }

  static fluentlyValidator(login: string) {
    if (login.includes("@")) return ValidateService.emailValidator(login);
    if (login.includes("+")) return ValidateService.phoneValidator(login);
    return ValidateService.usernameValidator(login);
  }

  static phoneValidator(phoneNumber: string) {
    console.log(phoneNumber);
    return isPossiblePhoneNumber(phoneNumber) && isValidPhoneNumber(phoneNumber)
      ? null
      : "Phone number is incorrect";
  }
}
