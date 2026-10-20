import type { RegistrationFormData } from "./registration";

const authApiBaseUrl = (
  import.meta.env.VITE_AUTH_API_BASE_URL ?? "http://localhost:8081/users"
).replace(/\/+$/, "");

export const registerUser = async (
  formData: RegistrationFormData,
): Promise<void> => {
  const response = await fetch(`${authApiBaseUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok || response.redirected) {
    throw new Error("Registration request was rejected.");
  }
};
