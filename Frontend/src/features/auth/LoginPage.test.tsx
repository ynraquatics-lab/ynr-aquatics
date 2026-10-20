import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { store } from "../../store";
import LoginPage from "../../pages/auth/LoginPage";

afterEach(cleanup);

const renderLogin = () =>
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<p>Registration page</p>} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );

describe("LoginPage", () => {
  it("shows validation errors and blocks empty submissions", () => {
    renderLogin();

    fireEvent.click(screen.getByRole("button", { name: "Log in" }));

    expect(screen.getByText("Username is required.")).toBeTruthy();
    expect(screen.getByText("Password is required.")).toBeTruthy();
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("toggles password visibility accessibly", () => {
    renderLogin();
    const password = screen.getByLabelText("Password");

    expect(password.getAttribute("type")).toBe("password");
    fireEvent.click(screen.getByRole("button", { name: "Show password" }));
    expect(password.getAttribute("type")).toBe("text");
    fireEvent.click(screen.getByRole("button", { name: "Hide password" }));
    expect(password.getAttribute("type")).toBe("password");
  });

  it("links back to registration", () => {
    renderLogin();

    fireEvent.click(screen.getByRole("link", { name: "Register" }));

    expect(screen.getByText("Registration page")).toBeTruthy();
  });
});
