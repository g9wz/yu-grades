const formatSemester = (semester: string): string => {
  const year = semester.substring(0, 4);
  const part = semester.substring(4);

  let partName;
  switch (part) {
    case "1":
      partName = "1st";
      break;
    case "2":
      partName = "2nd";
      break;
    case "3":
      partName = "3rd";
      break;
    default:
      partName = "";
  }

  return `${year} - ${partName}`;
};

export default formatSemester;
