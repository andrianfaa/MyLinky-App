import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import store from "./app/store";

test("renders login page", async () => {
  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
  );

  const loginText = screen.getByTitle(/Login/i);
  const registerText = screen.getByText(/Register/i);
  const forgotPasswordText = screen.getByText(/Forgot password\?/i);

  const emailText = screen.getByLabelText(/Email \*/i);
  const passwordText = screen.getByLabelText(/Password \*/i);

  const inputEmail = screen.getByPlaceholderText("Enter your email");
  const inputPassword = screen.getByPlaceholderText("Enter your password");

  inputEmail.setAttribute("value", "test value");
  inputPassword.setAttribute("value", "test value");

  expect(loginText).toBeInTheDocument();
  expect(registerText).toBeInTheDocument();
  expect(forgotPasswordText).toBeInTheDocument();
  expect(emailText).toBeInTheDocument();
  expect(passwordText).toBeInTheDocument();

  expect(inputEmail).toBeInTheDocument();
  expect(inputPassword).toBeInTheDocument();

  expect(inputEmail.getAttribute("value")).toBe("test value");
  expect(inputPassword.getAttribute("value")).toBe("test value");
});
