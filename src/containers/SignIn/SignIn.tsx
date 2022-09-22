import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import Form from "../../components/Form";
import FormButton from "../../components/Form/components/FormButton";
import FormTextField from "../../components/Form/components/FormTextField";
import { FormErrors } from "../../components/Form/interface";
import FormService from "../../services/Form/FormServcie";
import ValidateService from "../../services/Validation/ValidationService";
import Paper from "../../components/Paper";
import {
  loadGoogleAuthScript,
  removeGoogleAuthScript,
} from "../../utils/googleAuthScript";
import CircularProgress from "../../components/CircularProgress";
import { Link } from "react-router-dom";

interface ResponseDataInterface {
  errors: FormErrors;
}

export const SignIn: React.FC = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const googleButtonId = "google-button";

  const sendSignUpData = async (sendData: any) => {
    const convertedData = FormService.convertFormFieldArrayToObject(sendData);
    const { data } = await axios.post(
      "http://localhost:5041/api/auth/sign-in",
      convertedData
    );
    return data;
  };

  const isResponseErrors = (data: any): data is ResponseDataInterface => {
    return "errors" in data;
  };

  const { mutate, isLoading } = useMutation(sendSignUpData, {
    onSuccess: (data: any) => {
      console.log(data);
      const message = "success";
      alert(message);
    },
    onError: (error: AxiosError) => {
      if (error.response) {
        const { data } = error.response;
        if (data && typeof data === "object" && isResponseErrors(data))
          setErrors(data.errors);
      }
    },
    onSettled: () => {
      console.log("some trouble");
    },
  });
  const handleSubmit = (sendData: any) => {
    mutate(sendData);
  };

  const onLoadCallback = (response: any) => {
    console.log(response, "sing-in");
  };

  useEffect(() => {
    const scriptId = "google-auth";
    loadGoogleAuthScript({
      scriptId,
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID as string,
      buttonId: googleButtonId,
      onLoadCallback: onLoadCallback,
      buttonProps: {
        type: "standard",
        theme: "outline",
        size: "large",
      },
    });

    return () => {
      removeGoogleAuthScript(scriptId);
    };
  }, []);

  return (
    <article>
      <Paper>
        <Form onSubmit={handleSubmit} errors={errors}>
          <FormTextField
            name="username"
            type="username"
            placeholder="Enter your email, username or phone"
            onValidate={ValidateService.composeValidators(
              ValidateService.required,
              ValidateService.fluentlyValidator
            )}
          />
          <FormTextField
            name="password"
            type="password"
            onValidate={ValidateService.composeValidators(
              ValidateService.required,
              ValidateService.passwordValidator
            )}
          />
          <FormButton>Submit form</FormButton>
        </Form>
        <div id={googleButtonId}></div>
        {isLoading && <CircularProgress />}
        <Link to="/sign-up">Sign-up</Link>
      </Paper>
    </article>
  );
};
