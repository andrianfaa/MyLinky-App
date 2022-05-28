/* eslint-disable react/jsx-props-no-spreading */
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "redaxios";

import { useAppDispatch } from "../../app";
import { Container } from "../../components";
import {
  Button, Input, InputGroup, Spinner,
} from "../../components/ui";
import config from "../../config";
import { emailPattern, passwordPattern } from "../../constants";
import { setToken } from "../../features/auth";
import { Notyf } from "../../helpers";

import { EmailIcon, LockIcon } from "../../assets/icons";
import { LogoWithText } from "../../assets/images";

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

  const dispatch = useAppDispatch();
  const location = useLocation() as LocationState<{
    email: string;
    password: string;
  }>;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    const testEmail = name === "email" && new RegExp(emailPattern).test(value);
    const testPassword = name === "password" && new RegExp(passwordPattern).test(value);

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

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setLoading(true);

    const testEmail = new RegExp(emailPattern).test(formState.email);
    const testPassword = new RegExp(passwordPattern).test(formState.password);

    if (!testEmail && !testPassword) {
      setLoading(false);
      Notyf.error("Please enter a valid email and password");
      return;
    }

    if (!testEmail) {
      setLoading(false);
      Notyf.error("Email is not valid");
      return;
    }

    if (!testPassword) {
      setLoading(false);
      Notyf.error("Password is not valid");
      return;
    }

    try {
      const response = await axios<HttpResponse<{ token: string }>>({
        url: `${config.API.URL}/user/login`,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-api-key": config.API.KEY,
        },
        data: formState as LoginStateProps,
      });

      if (response.status === 200 && response.data.status === "success" && response.data.statusCode === 200) {
        const { token } = response.data?.data as { token: string };
        setLoading(false);
        dispatch(setToken(token));
        window.location.href = "/links";
        return;
      }

      setLoading(false);
      Notyf.error(response?.data?.message ?? "Login failed");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      Notyf.error(error?.message ?? error?.data?.message ?? "Login failed");
    }
  };

  useEffect(() => {
    if (location?.state?.email || location?.state?.password) {
      setFormState((prevState) => ({
        ...prevState,
        email: location?.state?.email ?? "",
        password: location?.state?.password ?? "",
      }));
    }
  }, [location?.state]);

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
          <Link to="/register" className="link-primary font-medium" title="Register">
            Register
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
            label="Remember me"
            targetId="remember-me"
            className="flex items-center gap-2 mb-4"
          >
            <Input.checkbox
              name="remember-me"
              id="remember-me"
              className="mr-2"
              disabled={isLoading}
            />
          </InputGroup.checkbox>

          <Button.submit
            className="button-base button-primary mb-4 w-full flex justify-center items-center"
            disabled={isLoading}
            title={isLoading ? "Loading..." : "Login"}
          >
            {isLoading ? <Spinner /> : "Login"}
          </Button.submit>
        </form>

        <Link to="/forgot-password" className="link-primary font-medium">
          Forgot password?
        </Link>
      </div>
    </Container>
  );
}
