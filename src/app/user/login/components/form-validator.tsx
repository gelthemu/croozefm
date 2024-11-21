export interface ValidationErrors {
  username?: string;
  email?: string;
  password?: string;
}

export const validateUsername = (username: string): string | null => {
  // username must be 4-10 characters, lowercase letters only
  const usernameRegex = /^[a-z]{4,10}$/;

  if (!username) {
    return "Username is required";
  }
  if (!usernameRegex.test(username)) {
    return "Username must be 4-10 characters long, lowercase letters only";
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  // Standard email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return "Email is required";
  }
  if (!emailRegex.test(email)) {
    return "Invalid email address";
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  // password validation requirements:
  const validations = [
    {
      test: (pw: string) => pw.length >= 6,
      message: "Password must be at least 6 characters long",
    },
    {
      test: (pw: string) => pw.length <= 20,
      message: "Password must be less than 20 characters",
    },
    {
      test: (pw: string) => /[a-z]/.test(pw),
      message: "Password must contain at least one lowercase letter",
    },
    {
      test: (pw: string) => /[A-Z]/.test(pw),
      message: "Password must contain at least one uppercase letter",
    },
    {
      test: (pw: string) => /[0-9]/.test(pw),
      message: "Password must contain at least one number",
    },
    {
      test: (pw: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw),
      message: "Password must contain at least one special character",
    },
  ];

  if (!password) {
    return "Password is required";
  }
  for (const validation of validations) {
    if (!validation.test(password)) {
      return validation.message;
    }
  }
  return null;
};

export const validateForm = (
  username: string,
  email: string,
  password: string
): ValidationErrors => {
  const errors: ValidationErrors = {};

  const usernameError = validateUsername(username);
  if (usernameError) {
    errors.username = usernameError;
  }
  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }
  const passwordError = validatePassword(password);
  if (passwordError) {
    errors.password = passwordError;
  }
  return errors;
};

export const validateLoginForm = (
  username: string,
  password: string
): ValidationErrors => {
  const errors: ValidationErrors = {};

  const usernameError = validateUsername(username);
  if (usernameError) {
    errors.username = usernameError;
  }
  const passwordError = validatePassword(password);
  if (passwordError) {
    errors.password = passwordError;
  }
  return errors;
};
