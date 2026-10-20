import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SignupPage from "../../pages/auth/SignupPage";
import { validateRegistrationForm } from "./registration";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("validateRegistrationForm", () => {
  it("accepts valid username and password values", () => {
    expect(
      validateRegistrationForm({
        username: "  waterlover  ",
        password: "ocean123",
      }),
    ).toEqual({});
  });

  it("rejects empty and whitespace-only usernames", () => {
    expect(
      validateRegistrationForm({ username: "", password: "ocean123" }).username,
    ).toBe("Username is required.");
    expect(
      validateRegistrationForm({ username: "   ", password: "ocean123" })
        .username,
    ).toBe("Username is required.");
  });

  it("enforces the 3–32 character username limit", () => {
    expect(
      validateRegistrationForm({ username: "ab", password: "ocean123" })
        .username,
    ).toBe("Username must be between 3 and 32 characters.");
    expect(
      validateRegistrationForm({
        username: "a".repeat(33),
        password: "ocean123",
      }).username,
    ).toBe("Username must be between 3 and 32 characters.");
  });

  it("requires a password of at least 8 characters", () => {
    expect(
      validateRegistrationForm({ username: "aqua", password: "1234567" })
        .password,
    ).toBe("Password must be at least 8 characters.");
    expect(
      validateRegistrationForm({ username: "aqua", password: "12345678" }),
    ).toEqual({});
  });
});

describe("SignupPage", () => {
  const renderSignup = () =>
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<p>Login page</p>} />
        </Routes>
      </MemoryRouter>,
    );

  it("shows field errors and blocks an invalid submission", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    renderSignup();

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(screen.getByText("Username is required.")).toBeTruthy();
    expect(
      screen.getByText("Password must be at least 8 characters."),
    ).toBeTruthy();
    expect(screen.queryByRole("alert")).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("shows an error when the registration service cannot be reached", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    renderSignup();
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "waterlover" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "ocean123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toContain(
      "We couldn't confirm your registration.",
    );
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("shows an error when the registration service rejects the request", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    renderSignup();
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "waterlover" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "ocean123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(await screen.findByRole("alert")).toBeTruthy();
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("shows success only after the registration service succeeds", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    renderSignup();
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "  waterlover  " },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "ocean123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    const status = await screen.findByRole("status");
    expect(status.textContent).toContain(
      "Your YNR Aquatics account has been created.",
    );
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:8081/users/auth/register",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          username: "waterlover",
          password: "ocean123",
        }),
      }),
    );
  });

  it("toggles password visibility accessibly", () => {
    renderSignup();
    const password = screen.getByLabelText("Password");

    expect(password.getAttribute("type")).toBe("password");
    fireEvent.click(screen.getByRole("button", { name: "Show password" }));
    expect(password.getAttribute("type")).toBe("text");
    expect(
      screen.getByRole("button", { name: "Hide password" }).getAttribute(
        "aria-pressed",
      ),
    ).toBe("true");
    fireEvent.click(screen.getByRole("button", { name: "Hide password" }));
    expect(password.getAttribute("type")).toBe("password");
  });

  it("navigates to the login route", () => {
    renderSignup();

    fireEvent.click(screen.getByRole("link", { name: "Log in" }));

    expect(screen.getByText("Login page")).toBeTruthy();
  });
});
