// International currency formatter to convert the time into a date format

export function timeFormatter(time) {
  if (!time) return "";
  const date = new Date(time);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
