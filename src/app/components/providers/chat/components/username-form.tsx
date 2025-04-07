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

  const containsEmoji = (text: string): boolean => {
    const emojiRegex =
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    return emojiRegex.test(text);
  };

  const containsRestrictedWord = (value: string) => {
    const lowercaseValue = value.toLowerCase();
    return RESTRICTED_WORDS.some((word) => lowercaseValue.includes(word));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username.length < 4) {
      setError("At least 4 characters");
      return;
    } else if (username.length > 20) {
      setError("Not more than 20 chars");
      return;
    } else if (containsRestrictedWord(username)) {
      setError("Username already exists");
      return;
    } else if (containsEmoji(username)) {
      setError("No emojis 😄");
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
    } else if (value.length > 20) {
      setError("Not more than 20 chars");
    } else if (/\d/.test(value)) {
      setError("Cannot contain numbers");
    } else if (containsRestrictedWord(value)) {
      setError("Username already exists");
    } else if (containsEmoji(value)) {
      setError("No emojis 😄");
    } else {
      setError("");
    }

    setUsername(value);
  };

  return (
    <div className="w-full text-sm mt-auto">
      <div className="p-4 relative bg-gray/10 dark:bg-light/5">
        <form onSubmit={handleSubmit}>
          <div className="w-full flex flex-row space-x-2">
            <div className="flex-1">
              <label htmlFor="username" className="sr-only">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                  onPaste={(e) => e.preventDefault()}
                  onCopy={(e) => e.preventDefault()}
                  onCut={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                  onInput={(e) => {
                    const input = e.target as HTMLInputElement;
                    if (input.value.length > 20) {
                      input.value = input.value.slice(0, 20);
                    }
                  }}
                  required
                  className={`w-full bg-transparent border-b-2 ${
                    error
                      ? "border-gray/50 dark:border-light/50"
                      : "border-red/90"
                  } rounded-sm focus:outline-none p-1`}
                  placeholder="Enter your name..."
                  minLength={4}
                  maxLength={20}
                  autoComplete="off"
                  data-lpignore="true"
                  style={{
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                    userSelect: "none",
                  }}
                />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 px-1 bg-gray/10 dark:bg-light/5 rounded-sm lowercase">
                  <span className="opacity-50 text-xs">
                    {Math.min(username.length, 20)}/20
                  </span>
                </div>
              </div>
            </div>{" "}
            <div>
              <button
                aria-label="Enter chat"
                type="submit"
                disabled={
                  username.length < 4 ||
                  username.length > 20 ||
                  /\d/.test(username) ||
                  !username.trim() ||
                  !termsAccepted ||
                  containsRestrictedWord(username) ||
                  containsEmoji(username)
                }
                className="w-fit text-sm bg-red text-light font-medium _912cfm px-3 py-1 rounded-sm disabled:bg-gray dark:disabled:bg-light/40 focus:outline-none"
              >
                Go
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
              I promise to behave!..
            </label>
          </div>
        </form>
        {error && (
          <div className="absolute top-0 left-2 lowercase transition-all duration-300">
            <span className="text-red/90 text-xs">{`⁕ ${error}` || "***"}</span>
          </div>
        )}
      </div>
    </div>
  );
}
