/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import type { ReactElement } from "react";

import { Container } from "../components";
import {
  Input, InputGroup, InputWithIcon, Button, LoadingIcon, notyf,
} from "../components/atom";
import { emailRegExp, passwordRegExp } from "../constants";

import { ReactComponent as MailIcon } from "../assets/icons/ic-email.svg";
import { ReactComponent as LockIcon } from "../assets/icons/ic-lock.svg";

export interface LoginStateProps {
  email: string;
  password: string;
}

export interface FormInput {
  name: string;
  id: string;
  label: string;
  placeholder: string;
  icon: JSX.Element | ReactElement;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
  disabled?: boolean;
  required?: boolean;
  title?: string;
  pattern?: string;
}

export default function Login(): JSX.Element {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<LoginStateProps>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    const testEmail = (name === "email") && new RegExp(emailRegExp).test(value);
    const testPassword = (name === "password") && new RegExp(passwordRegExp).test(value);

    if (testEmail || testPassword) {
      event.target.classList.remove("input-error");
    } else {
      event.target.classList.add("input-error");
    }

    setFormState((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setLoading(true);

    const testEmail = new RegExp(emailRegExp).test(formState.email);
    const testPassword = new RegExp(passwordRegExp).test(formState.password);

    if (!testEmail && !testPassword) {
      setLoading(false);
      notyf.error("Please enter a valid email and password");
      return;
    }

    if (!testEmail) {
      setLoading(false);
      notyf.error("Email is not valid");
      return;
    }

    if (!testPassword) {
      setLoading(false);
      notyf.error("Password is not valid");
      return;
    }

    console.log(formState);
    notyf.success("Login success");
    setTimeout(() => setLoading(false), 2000);
  };

  const formInput: FormInput[] = [
    {
      name: "email",
      label: "Email",
      id: "email",
      icon: <MailIcon />,
      type: "email",
      placeholder: "Enter your email",
      onChange: handleChange,
      required: true,
      disabled: isLoading,
      value: formState.email,
      title: "Enter your email",
    },
    {
      name: "password",
      label: "Password",
      id: "password",
      icon: <LockIcon />,
      type: "password",
      placeholder: "Enter your password",
      onChange: handleChange,
      required: true,
      value: formState.password,
      disabled: isLoading,
      title: "Enter your password",
    },
  ];

  return (
    <Container className="min-h-screen w-full p-6 flex justify-center items-center">
      <form className="w-full max-w-[350px]" onSubmit={handleOnSubmit}>

        {formInput.flatMap((input: FormInput) => (
          <InputGroup
            key={input.name}
            label={input.label}
            targetId={input.id}
            isRequired={input.required}
          >
            <InputWithIcon
              className="mb-4 w-full"
              icon={input.icon}
              renderInput={(
                <Input
                  className="pl-12"
                  title={input.title}
                  pattern={input.pattern as string}
                  {...input}
                />
              )}
            />
          </InputGroup>
        ))}

        <Button
          onClick={() => console.log("clicked")}
          className="button-base button-primary mb-4 w-full flex justify-center items-center"
          title={isLoading ? <LoadingIcon /> : "Login"}
          buttonTitle={isLoading ? "Loading..." : "Login"}
          type="submit"
          disabled={isLoading}
        />

      </form>
    </Container>
  );
}
