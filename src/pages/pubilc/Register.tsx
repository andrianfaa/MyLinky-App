/* eslint-disable react/jsx-props-no-spreading */
import type { ReactElement } from "react";
import { useState } from "react";
import axios from "redaxios";
import { Link, useNavigate } from "react-router-dom";

import { Notyf } from "../../helpers";
import { Container } from "../../components";
import {
  Button, Input, Spinner, InputGroup,
} from "../../components/ui";
import config from "../../config";
import { emailPattern, passwordPattern, usernamePattern } from "../../constants";

import { EmailIcon, LockIcon, UserIcon } from "../../assets/icons";
import { LogoWithText } from "../../assets/images";

export interface RegisterStateProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
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

export default function Register(): JSX.Element {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<RegisterStateProps>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    const testEmail = name === "email" && new RegExp(emailPattern).test(value);
    const testPassword = name === "password" && new RegExp(passwordPattern).test(value);
    const testUsername = name === "username" && new RegExp(usernamePattern).test(value);
    const testConfirmPassword = name === "confirmPassword" && value === formState.password;

    if (testEmail || testPassword || testUsername || testConfirmPassword) {
      event.target.classList.remove("input-error");
    } else {
      event.target.classList.add("input-error");
    }

    setFormState((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setLoading(true);

    const testUsername = new RegExp(usernamePattern).test(formState.username);
    const testEmail = new RegExp(emailPattern).test(formState.email);
    const testPassword = new RegExp(passwordPattern).test(formState.password);
    const testConfirmPassword = formState.password === formState.confirmPassword;

    if (!testUsername) {
      setLoading(false);
      Notyf.error("Username is not valid, it must be between 3 and 20 characters and can only contain letters, numbers and underscores");
      return;
    }

    if (!testEmail) {
      setLoading(false);
      Notyf.error("Email is not valid");
      return;
    }

    if (!testPassword) {
      setLoading(false);
      Notyf.error("Password is not valid, it must be at least 8 characters long and contain at least one number and one uppercase letter");
      return;
    }

    if (!testConfirmPassword) {
      setLoading(false);
      Notyf.error("Passwords do not match");
      return;
    }

    const register = async (): Promise<void> => {
      try {
        const response = await axios.post(`${config.API.URL}/user/register`, formState as RegisterStateProps, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-api-key": config.API.KEY,
          },
        });

        if (response.status === 200 && response.data.status === "success" && response.data.statusCode === 200) {
          setLoading(false);
          Notyf.success("Registration successful. Please login to continue");
          setFormState({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          navigate("/", {
            state: {
              email: formState.email,
              password: formState.password,
            },
          });
          return;
        }

        setLoading(false);
        Notyf.error("Registration failed");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setLoading(false);
        Notyf.error(error?.message ?? error?.data?.message ?? "Registration failed");
      }
    };

    register();
  };

  const formInput: FormInput[] = [
    {
      name: "username",
      label: "Username",
      id: "username",
      icon: <UserIcon />,
      type: "text",
      placeholder: "mylinky_username",
      onChange: handleChange,
      required: true,
      disabled: isLoading,
      value: formState.username,
      title: "Enter your username",
    },
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
    {
      name: "confirmPassword",
      label: "Confirm password",
      id: "configpassword",
      icon: <LockIcon />,
      type: "password",
      placeholder: "Confirm your password",
      onChange: handleChange,
      required: true,
      value: formState.confirmPassword,
      disabled: isLoading,
      title: "Confirm your password",
    },
  ];

  return (
    <Container className="min-h-screen max-w-[unset] bg-white sm:bg-primary w-full sm:p-6 flex justify-center items-center">
      <div className="w-full max-w-[400px] rounded-xl bg-white sm:shadow-lg p-[30px] text-center">
        <LogoWithText className="scale-150 mx-auto mb-9" />

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-dark-1">Register</h1>
          <Link to="/" className="link-primary font-medium" title="Login">
            Login
          </Link>
        </div>

        <form onSubmit={handleOnSubmit} className="text-left">
          {formInput.flatMap((input: FormInput) => (
            <InputGroup.withLabel
              key={input.id}
              label={input.label}
              targetId={input.id}
              required={input.required}
            >
              <Input.withIcon
                name={input.name}
                id={input.id}
                disabled={input.disabled}
                className="input-base pl-12"
                placeholder={input.placeholder}
                onChange={input.onChange}
                value={input.value}
                type={input.type || "text"}
                title={input.title}
                showIcon
                leftIcon={input.icon}
              />
            </InputGroup.withLabel>
          ))}

          <InputGroup.checkbox
            label="I agree to the terms and conditions"
            targetId="terms"
            className="flex items-center gap-2 mb-4"
            required
          >
            <Input.checkbox
              name="terms"
              id="terms"
              className="mr-2"
              disabled={isLoading}
              required
            />
          </InputGroup.checkbox>

          <Button.submit
            className="button-base button-primary mb-4 w-full flex justify-center items-center"
            disabled={isLoading}
            title={isLoading ? "Loading..." : "Register"}
          >
            {isLoading ? <Spinner className="w-8 h-8" /> : "Register"}
          </Button.submit>
        </form>

      </div>
    </Container>
  );
}
