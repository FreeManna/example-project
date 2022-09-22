import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import Form from "../../components/Form";
import FormButton from "../../components/Form/components/FormButton";
import FormTextField from "../../components/Form/components/FormTextField";
import ValidateService from "../../services/Validation/ValidationService";
import FormService from "../../services/Form/FormServcie";
import { FormErrors } from "../../components/Form/interface";
import Paper from "../../components/Paper";
import { axiosApiClient } from "../../api/axiosApi";
import {
  loadGoogleAuthScript,
  removeGoogleAuthScript,
} from "../../utils/googleAuthScript";
import CircularProgress from "../../components/CircularProgress";
import { Link } from "react-router-dom";

export const SignUp: React.FC = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const googleButtonId = "google-button";

  const sendSignUpData = async (sendData: any) => {
    const convertedData = FormService.convertFormFieldArrayToObject(sendData);
    const { data } = await axiosApiClient.post(
      "api/auth/sign-up",
      convertedData
    );
    return data;
  };

  const { mutate, isLoading } = useMutation(sendSignUpData, {
    onSuccess: (data: any) => {
      console.log(data);
      const message = "success";
      alert(message);
    },
    onError: (error: any) => {
      setErrors(error.response.data.errors);
    },
    onSettled: () => {
      console.log("some trouble");
    },
  });
  const handleSubmit = (sendData: any) => {
    mutate(sendData);
  };

  const onLoadCallback = (response: any) => {
    console.log(response, "sign-up");
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
            name="email"
            type="email"
            onValidate={ValidateService.composeValidators(
              ValidateService.required,
              ValidateService.emailValidator
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
          <FormTextField
            name="passwordConfirmation"
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
        <Link to="/sign-in">Sign-in</Link>
      </Paper>
    </article>
  );
};
