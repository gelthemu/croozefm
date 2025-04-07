"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type SuggestionFormContextType = {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  hideForm: () => void;
};

const SuggestionFormContext = createContext<SuggestionFormContextType>({
  showForm: false,
  setShowForm: () => {},
  hideForm: () => {},
});

export const useSuggestionForm = () => useContext(SuggestionFormContext);

export const SuggestionFormProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [showForm, setShowForm] = useState(false);

  const hideForm = () => {
    setShowForm(false);
  };

  return (
    <SuggestionFormContext.Provider
      value={{
        showForm,
        setShowForm,
        hideForm,
      }}
    >
      {children}
    </SuggestionFormContext.Provider>
  );
};
