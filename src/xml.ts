import xml2js from "xml2js";

export const xmlStrToJson = async (str: string) => {
  const parser = new xml2js.Parser();
  return parser.parseStringPromise(str);
};
