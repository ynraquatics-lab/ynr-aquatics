export interface RegistrationFormData {
  username: string;
  password: string;
}

export type ValidationErrors = Partial<
  Record<keyof RegistrationFormData, string>
>;

export const validateRegistrationForm = (
  formData: RegistrationFormData,
): ValidationErrors => {
  const errors: ValidationErrors = {};
  const username = formData.username.trim();

  if (!username) {
    errors.username = "Username is required.";
  } else if (username.length < 3 || username.length > 32) {
    errors.username = "Username must be between 3 and 32 characters.";
  }

  if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
};
