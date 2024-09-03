/**
 * Date yesterday
 * @return {Date}
 */
export const dateYesterday = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
};

/**
 * Date tomorrow
 * @return {Date}
 */
export const dateTomorrow = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
};

/**
 * Date format short
 * @example 2024-02-18
 * @return {string}
 */
export const dateFormatIsoShort = (date) => {
  return new Intl.DateTimeFormat("en-CA", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Regina",
  }).format(date);
};

/**
 * Date format long
 * @example 2024-02-18T00:00:00-06:00
 * @return {string}
 */
export const dateFormatIsoLong = (date) => {
  return dateFormatIsoShort(date) + "T00:00:00-06:00";
};

/**
 * Date format time
 * @example 12:00 p.m.
 * @return {string}
 */
export const dateFormatTime = (date) => {
  return new Intl.DateTimeFormat("en-CA", {
    hour: "numeric",
    minute: "numeric",
    timeZone: "America/Regina",
  }).format(date);
};

/**
 * Date format short
 * @example Thu, Feb 15
 * @return {string}
 */
export const dateFormatShort = (date) => {
  return new Intl.DateTimeFormat("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "America/Regina",
  }).format(date);
};

/**
 * Date format long
 * @example Fri, Feb 16, 5:46 p.m.
 * @return {string}
 */
export const dateFormatLong = (date) => {
  return new Intl.DateTimeFormat("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "America/Regina",
  }).format(date);
};
