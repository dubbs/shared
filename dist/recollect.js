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
export const recollect = async (RECOLLECT_URL) => {
    const response = await fetch(RECOLLECT_URL || "");
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
//# sourceMappingURL=recollect.js.map