"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useGrades } from "@context/GradesContext";

import { ErrorView, GradesView } from "@components/grades";

export default function GradesPage() {
  const { data, error } = useGrades();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      router.push("/");
    }
  }, [error]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center px-5">
      {!data ||
      !Array.isArray(data.allGrades) ||
      data.allGrades.length === 0 ? (
        <ErrorView />
      ) : (
        <GradesView
          currentSemester={data.currentSemester}
          gradesData={data.allGrades}
        />
      )}
    </div>
  );
}
