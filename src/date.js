/**
 * Date yesterday
 * @function
 * @return {Date}
 */
export const dateYesterday = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
};

/**
 * Date tomorrow
 * @function
 * @return {Date}
 */
export const dateTomorrow = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
};

/**
 * Date format short
 * @function
 * @param {Date} date - The date to format
 * @return {string} 2024-02-18
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
 * @function
 * @param {Date} date - The date to format
 * @return {string} 2024-02-18T00:00:00-06:00
 */
export const dateFormatIsoLong = (date) => {
  return dateFormatIsoShort(date) + "T00:00:00-06:00";
};

/**
 * Date format time
 * @function
 * @param {Date} date - The date to format
 * @return {string} 12:00 p.m.
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
 * @function
 * @param {Date} date - The date to format
 * @return {string} Thu, Feb 15
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
 * @function
 * @param {Date} date - The date to format
 * @return {string} Fri, Feb 16, 5:46 p.m.
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
