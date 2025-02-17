export function convertDateToSQL(date: Date): string | null {
  if (!date || (date instanceof Date && isNaN(date.getDate()))) return null;

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`;
}

export function formatDateToISO(
  dateString: string | null | undefined
): string | null {
  if (dateString === undefined || dateString === null) return null;
  const months: { [key: string]: string } = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  const [monthStr, dayStr, yearStr] = dateString.replace(/,|\./g, "").split(" ");

  const month = months[monthStr];
  const day = parseInt(dayStr, 10).toString().padStart(2, "0");
  const year = yearStr;

  return `${year}-${month}-${day}`;
}
