import { useState } from "react";

interface UsernameFormProps {
  onSubmit: (username: string) => void;
}

export default function UsernameForm({ onSubmit }: UsernameFormProps) {
  const [username, setUsername] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");

  const RESTRICTED_WORDS = [
    "admin",
    "owner",
    "manager",
    "moderator",
    "supervisor",
    "administrator",
    "staff",
    "official",
    "office",
    "crooze",
  ];

  const containsRestrictedWord = (value: string) => {
    const lowercaseValue = value.toLowerCase();
    return RESTRICTED_WORDS.some((word) => lowercaseValue.includes(word));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username.length < 4) {
      setError("At least 4 characters");
      return;
    } else if (username.length > 15) {
      setError("Not more than 15 characters");
      return;
    } else if (containsRestrictedWord(username)) {
      setError("Username already exists");
      return;
    }

    if (!termsAccepted) {
      alert("You must agree to the terms and conditions to continue");
      return;
    }

    onSubmit(username);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length < 4) {
      setError("At least 4 characters");
    } else if (value.length > 15) {
      setError("Not more than 15 characters");
    } else if (/\d/.test(value)) {
      setError("Cannot contain numbers");
    } else if (containsRestrictedWord(value)) {
      setError("Username already exists");
    } else {
      setError("");
    }

    setUsername(value);
  };

  return (
    <div className="w-full text-sm mt-auto">
      <div className="p-4 bg-gray/10 dark:bg-light/5">
        <form onSubmit={handleSubmit}>
          <div className="w-full flex flex-row space-x-2">
            <div className="flex-1">
              <label htmlFor="username" className="sr-only">
                Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                required
                className={`w-full mb-0.5 bg-transparent border-b-2 ${
                  error
                    ? "border-red/90"
                    : "border-gray/50 dark:border-light/50"
                } rounded-sm focus:outline-none p-1`}
                placeholder="Enter your name..."
                minLength={4}
                maxLength={15}
              />
              <div className="flex justify-between text-xs lowercase">
                <span className={error ? "text-red/90" : "text-transparent"}>
                  {error || "."}
                </span>
                <span className="opacity-50">
                  {Math.min(username.length, 15)}/15
                </span>
              </div>
            </div>{" "}
            <div>
              <button
                aria-label="Enter chat"
                type="submit"
                disabled={
                  username.length < 4 ||
                  username.length > 15 ||
                  /\d/.test(username) ||
                  !username.trim() ||
                  !termsAccepted ||
                  containsRestrictedWord(username)
                }
                className="w-fit text-sm bg-red text-light font-medium _912cfm px-3 py-1 rounded-md disabled:bg-gray dark:disabled:bg-light/40 focus:outline-none"
              >
                Enter Chat
              </button>
            </div>
          </div>
          <div className="mt-2.5 flex items-start">
            <div className="relative mr-2 flex items-center justify-center">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="flex items-center justify-center appearance-none w-4 h-4 border-[2px] border-gray/80 dark:border-light/50 rounded-sm focus:outline-none checked:bg-red checked:border-transparent"
              />
              <span className="absolute inset-0 flex items-center justify-center focus:outline-none pointer-events-none">
                <svg
                  className={`h-3 w-3 text-white ${
                    termsAccepted ? "block" : "hidden"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
            </div>
            <label htmlFor="terms" className="text-xs">
              I promise to behave!.. We&apos;ll store your name in this browser.
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
