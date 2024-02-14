function getGradeColor(grade: string) {
  let gradeColor = "";

  switch (grade) {
    case "A+":
    case "A":
      gradeColor = "rgb(34 197 94)";
      break;
    case "B+":
    case "B":
      gradeColor = "rgb(59 130 246)";
      break;
    case "C+":
    case "C":
      gradeColor = "rgb(252 211 77)";
      break;
    case "D+":
    case "D":
      gradeColor = "rgb(249 115 22)";
      break;
    case "F":
      gradeColor = "rgb(153 27 27)";
      break;
    default:
      gradeColor = "rgb(107 114 128)";
  }

  return gradeColor;
}

export default getGradeColor;
