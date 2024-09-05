import xml2js from "xml2js";

/**
 * Convert XML string to JSON
 * @async
 * @function
 * @param {string} str
 * @return {Promise<unknown>}
 */
export const xmlStrToJson = async (str) => {
  const parser = new xml2js.Parser();
  return parser.parseStringPromise(str);
};
