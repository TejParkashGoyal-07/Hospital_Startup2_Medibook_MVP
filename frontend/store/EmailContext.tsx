import React, { useState, createContext, useContext, ReactNode } from "react";

// Define the type for the context value
interface EmailContextType {
  email: string | null;
  setEmail: (email: string | null) => void;
}

// Create context with default value as undefined
const EmailContext = createContext<EmailContextType | undefined>(undefined);

// Define the provider props
interface EmailProviderProps {
  children: ReactNode;
}

// Simple provider component
export const EmailProvider: React.FC<EmailProviderProps> = ({ children }) => {
  const [email, setEmail] = useState<string | null>(null); // Default state is null

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};
