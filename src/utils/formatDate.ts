export const formatShortDate = (date: Date | string) => {
  const d = new Date(date);

  const formatted = d
    .toLocaleDateString("es-ES", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    })
    .replace(".", "");

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export const formatFullDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
};
