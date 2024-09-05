if (!process.env.RECOLLECT_URL) {
  throw new Error("RECOLLECT_URL is not defined in environment variables");
}

const RECOLLECT_URL = process.env.RECOLLECT_URL;

/**
 * An event from Recollect.
 * @typedef {Object} RecollectItem
 * @property {string} date - A date string.
 * @property {string} type - A string.
 */

/**
 * Fetches events from the Recollect API.
 * @function
 * @async
 * @return {Promise<RecollectItem[]>}
 */
export const recollect = async () => {
  const response = await fetch(RECOLLECT_URL);
  const json = await response.json();
  return json.events
    .map((x) => {
      if (x.is_approved) {
        const date = new Date(`${x.day}T06:00:00Z`).toISOString();
        return {
          type: x.flags[0].subject,
          date: date,
        };
      }
    })
    .filter((x) => x);
};
