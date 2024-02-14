"use client";

import { createContext, useContext, useState } from "react";

import { Grade } from "@hooks/useFetchGrades";

interface GradesContextType {
  data: {
    currentSemester: string;
    allGrades: { semester: string; grades: Grade[] }[];
  } | null;
  setData: React.Dispatch<
    React.SetStateAction<{
      currentSemester: string;
      allGrades: { semester: string; grades: Grade[] }[];
    } | null>
  >;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const GradesContext = createContext<GradesContextType | undefined>(undefined);

export const GradesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<{
    currentSemester: string;
    allGrades: { semester: string; grades: Grade[] }[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <GradesContext.Provider
      value={{ data, setData, error, setError, isLoading, setIsLoading }}
    >
      {children}
    </GradesContext.Provider>
  );
};

export const useGrades = () => {
  const context = useContext(GradesContext);
  if (!context) {
    throw new Error("useGrades must be used within a GradesProvider");
  }
  return context;
};
