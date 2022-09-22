export interface FormPhoneNumberInputProps {
  name: string;
  placeholder?: string;
  onValidate?: (value: string) => string | undefined;
}
