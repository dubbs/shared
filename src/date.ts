export const dateYesterday = (): Date => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
};

export const dateTomorrow = (): Date => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
};

// 2024-02-18
export const dateFormatIsoShort = (date: Date): string => {
  return new Intl.DateTimeFormat("en-CA", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Regina",
  }).format(date);
};

// 2024-02-18T00:00:00-06:00
export const dateFormatIsoLong = (date: Date): string => {
  return dateFormatIsoShort(date) + "T00:00:00-06:00";
};

// 12:00 p.m.
export const dateFormatTime = (date: Date): string => {
  return new Intl.DateTimeFormat("en-CA", {
    hour: "numeric",
    minute: "numeric",
    timeZone: "America/Regina",
  }).format(date);
};

// Thu, Feb 15
export const dateFormatShort = (date: Date): string => {
  return new Intl.DateTimeFormat("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "America/Regina",
  }).format(date);
};

// Fri, Feb 16, 5:46 p.m.
export const dateFormatLong = (date: Date): string => {
  return new Intl.DateTimeFormat("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "America/Regina",
  }).format(date);
};
