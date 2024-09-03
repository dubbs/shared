if (!process.env.RECOLLECT_URL) {
  throw new Error("RECOLLECT_URL is not defined in environment variables");
}

const RECOLLECT_URL = process.env.RECOLLECT_URL;

/**
 * Fetches the Recollect API and returns the events.
 * @return {Promise<unknown>}
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
