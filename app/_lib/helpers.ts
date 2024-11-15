export function extractYear(dateTimeString: string) {
  if (!dateTimeString) return null;
  const year = dateTimeString.split("T")[0].split("-")[0];
  return year;
}
