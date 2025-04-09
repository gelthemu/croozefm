"use client";

import React from "react";
import { useSuggestionForm } from "@/app/context/suggestion-form-context";

const SubmitArticle: React.FC = () => {
  const { showForm, setShowForm } = useSuggestionForm();

  return (
    <div className="text-left">
      <div className="mt-8 p-4 bg-gradient-to-br from-gray/10 to-gray/5 dark:from-gray/40 dark:to-transparent rounded-sm">
        <h3 className="font-semibold text-lg text-red mb-2 _912cfm">
          Got a Scoop We Missed?
        </h3>
        <p className="text-sm mb-4">
          {`
          Found a news-worthy article we haven't covered? Submit the link in a text message
          and we'll scrape it. Don't be selfish—share the story with us, we
          wanna read it too!`}
        </p>
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            setShowForm(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setShowForm(true);
            }
          }}
          className={`w-fit btn-xs bg-red text-sm text-light text-center font-medium _912cfm px-4 py-2 rounded-sm focus:outline-none ${
            showForm
              ? "opacity-80 cursor-default select-none"
              : "cursor-pointer"
          }`}
        >
          <span className="">SUBMIT</span>{" "}
        </div>
      </div>
    </div>
  );
};

export default SubmitArticle;
