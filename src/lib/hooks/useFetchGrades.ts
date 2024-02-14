"use client";

import { useGrades } from "@context/GradesContext";

export interface Grade {
  activityDesc: string;
  confirmedMark: string;
  courseCode: string;
  courseName: string;
  courseNo: string;
  creditHours: string;
  gradeDesc: string;
  sumation: string;
}

interface FetchGradesResult {
  fetchGrades: (credentials: {
    studentId: string;
    password: string;
  }) => Promise<boolean>;
}

const useFetchGrades = (): FetchGradesResult => {
  const { setData, setError, setIsLoading } = useGrades();

  const fetchGrades = async (credentials: {
    studentId: string;
    password: string;
  }): Promise<boolean> => {
    const { studentId, password } = credentials;

    const isDev = process.env.NODE_ENV === "development";

    if (!isDev && (!studentId || !password)) {
      setError("Credentials are required");
      return false;
    }

    setIsLoading(true);

    if (isDev) {
      setData(fakeData);
      setIsLoading(false);
      return true;
    }

    try {
      const response = await fetch("/api/grades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();
      setData(jsonData);
      return true;
    } catch (error) {
      console.error("Error:", error);
      setError("Looks like the university blocked the API 😔");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchGrades };
};

export default useFetchGrades;

const fakeData = {
  currentSemester: "20232",
  allGrades: [
    {
      semester: "20231",
      grades: [
        {
          courseName: "Introduction to Computer Science",
          courseCode: "CIS101",
          creditHours: "3",
          gradeDesc: "A+",
          confirmedMark: "95",
          activityDesc: "",
          courseNo: "101",
          sumation: "",
        },
        {
          courseName: "Derivatives and Chill",
          courseCode: "MTH102",
          creditHours: "3",
          gradeDesc: "B+",
          confirmedMark: "85",
          activityDesc: "",
          courseNo: "102",
          sumation: "",
        },
        {
          courseName: "Making Things Fall",
          courseCode: "PHY103",
          creditHours: "3",
          gradeDesc: "C+",
          confirmedMark: "75",
          activityDesc: "",
          courseNo: "103",
          sumation: "",
        },
        {
          courseName: "Exploding CPUs",
          courseCode: "CHM104",
          creditHours: "3",
          gradeDesc: "D+",
          confirmedMark: "65",
          activityDesc: "",
          courseNo: "104",
          sumation: "",
        },
        {
          courseName: "How to Center a Div",
          courseCode: "SWE101",
          creditHours: "3",
          gradeDesc: "F",
          confirmedMark: "50",
          activityDesc: "",
          courseNo: "101",
          sumation: "",
        },
        {
          courseName: "Touch Grass 101",
          courseCode: "PHL101",
          creditHours: "3",
          gradeDesc: "W",
          confirmedMark: "",
          activityDesc: "Withdrawn",
          courseNo: "101",
          sumation: "",
        },
      ],
    },
    {
      semester: "20232",
      grades: [
        {
          courseName: "Big Oof Notation",
          courseCode: "SWE201",
          creditHours: "3",
          gradeDesc: "A+",
          confirmedMark: "92",
          activityDesc: "",
          courseNo: "201",
          sumation: "",
        },
        {
          courseName: "How to Survive a Code Review",
          courseCode: "SWE202",
          creditHours: "3",
          gradeDesc: "B+",
          confirmedMark: "87",
          activityDesc: "",
          courseNo: "202",
          sumation: "",
        },
        {
          courseName: "SQL or NoSQL?",
          courseCode: "SWE203",
          creditHours: "3",
          gradeDesc: "C+",
          confirmedMark: "77",
          activityDesc: "",
          courseNo: "203",
          sumation: "",
        },
        {
          courseName: "The Art of Googling",
          courseCode: "SWE204",
          creditHours: "3",
          gradeDesc: "D+",
          confirmedMark: "68",
          activityDesc: "",
          courseNo: "204",
          sumation: "",
        },
        {
          courseName: "Why is My Code Not Working?",
          courseCode: "SWE205",
          creditHours: "3",
          gradeDesc: "F",
          confirmedMark: "45",
          activityDesc: "",
          courseNo: "205",
          sumation: "",
        },
        {
          courseName: "Touch Grass 102",
          courseCode: "PHL202",
          creditHours: "3",
          gradeDesc: "W",
          confirmedMark: "",
          activityDesc: "Withdrawn",
          courseNo: "202",
          sumation: "",
        },
      ],
    },
  ],
};
