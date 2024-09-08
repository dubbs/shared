import xml2js from "xml2js";

/**
 * Convert XML string to JSON
 */
export const xmlStrToJson = async (str: string) => {
  const parser = new xml2js.Parser();
  return parser.parseStringPromise(str);
};
