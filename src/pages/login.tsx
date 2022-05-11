/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import type { ReactElement } from "react";

import { Link } from "react-router-dom";
import { Container } from "../components";
import {
  Input, InputCheckbox, InputGroup, InputWithIcon, Button, LoadingIcon, notyf,
} from "../components/atom";
import { emailRegExp, passwordRegExp } from "../constants";

import { LockIcon, EmailIcon } from "../assets/icons";
import { LogoWithText } from "../assets/images";

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

    const testEmail = name === "email" && new RegExp(emailRegExp).test(value);
    const testPassword = name === "password" && new RegExp(passwordRegExp).test(value);

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
      icon: <EmailIcon />,
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
    <Container className="min-h-screen max-w-[unset] bg-white sm:bg-primary w-full sm:p-6 flex justify-center items-center">
      <div className="w-full max-w-[400px] rounded-xl bg-white sm:shadow-lg p-[30px] text-center">
        <LogoWithText className="scale-150 mx-auto mb-9" />

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-dark-1">Login</h1>
          <Link to="/register" className="link-primary font-medium">
            Register
          </Link>
        </div>

        <form onSubmit={handleOnSubmit} className="text-left">
          {formInput.flatMap((input: FormInput) => (
            <InputGroup key={input.name} label={input.label} targetId={input.id} isRequired={input.required}>
              <InputWithIcon
                className="mb-4 w-full"
                icon={input.icon}
                renderInput={
                  <Input className="pl-12" title={input.title} pattern={input.pattern as string} {...input} />
                }
              />
            </InputGroup>
          ))}

          <InputCheckbox
            label="Remember me"
            targetId="remember-me"
            className="flex items-center gap-2 mb-4"
            disabled={isLoading}
          />

          <Button
            onClick={() => console.log("clicked")}
            className="button-base button-primary mb-4 w-full flex justify-center items-center"
            title={isLoading ? "Loading..." : "Login"}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <LoadingIcon /> : "Login"}
          </Button>
        </form>

        <Link to="/forgot-password" className="link-primary font-medium">
          Forgot password?
        </Link>
      </div>
    </Container>
  );
}
