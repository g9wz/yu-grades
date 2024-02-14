import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Yu FTW :)
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { studentId, password } = req.body;

  if (!studentId || !password) {
    return res.status(400).json({ error: "Credentials are required" });
  }

  const base64Credentials = Buffer.from(`${studentId}:${password}`).toString(
    "base64",
  );
  const languageIdentifier = "0"; // 0 for English, 1 for Arabic

  const myHeaders = new Headers({
    Authorization: `Basic ${base64Credentials}`,
    langId: languageIdentifier,
  });

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  const detailsUrl =
    "https://edugate.yu.edu.sa/yu/resources/common/commonServies/actorDetails/-1/1/2"; // took time to find
  const gradesUrl = (semester: string) =>
    `https://edugate.yu.edu.sa/yu/resources/student/coursesResults/getCoursesResults/${semester}`;

  try {
    const detailsResponse = await fetch(detailsUrl, requestOptions);
    if (!detailsResponse.ok) {
      throw new Error(`HTTP error! status: ${detailsResponse.status}`);
    }
    const detailsData = await detailsResponse.json();

    const joinSemester = detailsData?.sessionInfo?.joinSemester;
    const currentSemester = detailsData?.semester?.currentSemester;

    if (!joinSemester || !currentSemester) {
      throw new Error(
        "Unable to retrieve joinSemester or currentSemester from the response data.",
      );
    }

    const semesters = [];
    for (
      let year = parseInt(joinSemester.substring(0, 4));
      year <= parseInt(currentSemester.substring(0, 4));
      year++
    ) {
      semesters.push(`${year}1`); // first semester
      semesters.push(`${year}2`); // second semester
      semesters.push(`${year}3`); // summer semester (pain)
    }

    const allGrades = [];
    for (const semester of semesters) {
      const response = await fetch(gradesUrl(semester), requestOptions);
      if (response.ok) {
        const jsonData = await response.json();
        allGrades.push({ semester, grades: jsonData });
      }
    }

    return res.status(200).json({ currentSemester, allGrades });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the data." });
  }
}
