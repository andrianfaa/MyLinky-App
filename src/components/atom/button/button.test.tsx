import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Button } from ".";

test("render button", () => {
  render(
    <Button
      className="button-base"
      onClick={() => console.log("clicked")}
      title="Button"
    >
      Button
    </Button>,
  );

  const getButton = screen.getByText("Button");

  expect(getButton).toBeInTheDocument();
  expect(getButton.click()).toBe(console.log("clicked"));
  expect(getButton.getAttribute("class")).toBe("button-base");
  expect(getButton.getAttribute("title")).toBe("Button");
});
