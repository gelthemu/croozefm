"use client";

import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input, Label } from "./form-utils";
import { validateForm, validateLoginForm } from "./form-validator";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setError("");
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const message = searchParams.get("message");
    if (message) {
      setError("You must be logged in");

      // remove the message from the url
      searchParams.delete("message");
      const newUrl = `${window.location.pathname}${
        searchParams.toString() ? "?" + searchParams.toString() : ""
      }`;
      window.history.replaceState({}, "", newUrl);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const validationErrors = validateLoginForm(username, password);
    if (Object.keys(validationErrors).length > 0) {
      setError(Object.values(validationErrors).join("\n"));
      setIsLoading(false);
      return;
    }

    try {
      const searchParams = new URLSearchParams(window.location.search);
      const url = searchParams.get("url") || "/user/dashboard";

      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,

        // Add a callbackUrl to ensure the user is redirected to the dashboard
        callbackUrl: url,
      });

      if (result?.error) {
        // Handle error directly
        setError("Invalid username or password");
      } else if (result?.ok) {
        // Successfully logged in
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push(url);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setError(`An unexpected error occurred`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const validationErrors = validateForm(username, email, password);
    if (Object.keys(validationErrors).length > 0) {
      setError(Object.values(validationErrors).join("\n"));
      setIsLoading(false);
      return;
    }

    try {
      const searchParams = new URLSearchParams(window.location.search);
      const url = searchParams.get("url") || "/user/dashboard";

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
          password,
        }),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
      const text = await response.text();
      console.log("Response body:", text);

      const data = text ? JSON.parse(text) : {};

      if (!response.ok) {
        setError(data.error || "Registration failed");
        setIsLoading(false);
        return;
      }

      // Auto login the user after registration
      const loginResult = await signIn("credentials", {
        redirect: false,
        username,
        password,

        // Add a callbackUrl to ensure the user is redirected to the dashboard
        callbackUrl: url,
      });

      if (loginResult?.error) {
        setError(
          "Registration successful, but login failed. Please try logging in."
        );
        setIsNewUser(false);
      } else if (loginResult?.ok) {
        // Wait for a moment to ensure session is set
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push(url);
        router.refresh();
      }
    } catch (err) {
      setError(`An unexpected error occurred: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-sm mx-auto bg-dark/80 backdrop-blur-sm p-8 rounded-md">
        <div className="font-light text-3xl mb-10">
          <span className="text-light/40">
            {isNewUser ? "Become a croozer!" : "Login"}
          </span>
        </div>

        {error && (
          <div className={`text-sm mb-6 p-2 border border-red/60 rounded-md`}>
            {error}
          </div>
        )}

        {isNewUser ? (
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="relative">
              <Input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="username"
              />
              <Label htmlFor="username">Username</Label>
            </div>
            <div className="relative mb-8">
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="email"
              />
              <Label htmlFor="email">Email</Label>
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="new-password"
              />
              {password && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-1/2 -translate-y-1/2 right-0 flex items-center pr-2"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff
                      className="w-4 h-4 text-light/40"
                      strokeWidth={1.5}
                    />
                  ) : (
                    <Eye className="w-4 h-4 text-light/40" strokeWidth={1.5} />
                  )}
                </button>
              )}
              <Label htmlFor="password">Password</Label>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 font-medium text-light uppercase transition-all bg-red/50 rounded hover:bg-red/80 disabled:bg-red/20 disabled:cursor-not-allowed disabled:text-light/40"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <Input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="username"
              />
              <Label htmlFor="username">Username</Label>
            </div>
            <div className="relative mb-8">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="current-password"
              />
              {password && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-1/2 -translate-y-1/2 right-0 flex items-center pr-2"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff
                      className="w-4 h-4 text-light/40"
                      strokeWidth={1.5}
                    />
                  ) : (
                    <Eye className="w-4 h-4 text-light/40" strokeWidth={1.5} />
                  )}
                </button>
              )}
              <Label htmlFor="password">Password</Label>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 font-medium text-light uppercase transition-all bg-red/50 rounded hover:bg-red/80 disabled:bg-red/20 disabled:cursor-not-allowed disabled:text-light/40"
            >
              {isLoading ? "Logging In..." : "Login"}
            </button>
          </form>
        )}
        <div className="text-center text-sm mt-4 flex flex-col items-end">
          <p className="text-light/60">
            {isNewUser ? "Already have an account?" : "Don't have an account?"}
          </p>
          <button
            onClick={() => {
              setIsNewUser(!isNewUser);
              resetForm();
            }}
            type="button"
            disabled={isLoading}
            className="relative text-red/80 font-semibold bg-transparent border-none outline-none after:content-[''] after:absolute after:bottom-0 after:left-0 after:bg-red/80 after:h-px after:w-full disabled:text-red/40 disabled:cursor-not-allowed"
          >
            {isNewUser ? "Login" : "Create an account"}
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
