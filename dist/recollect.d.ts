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
export declare const recollect: (RECOLLECT_URL: string | undefined) => Promise<any>;
