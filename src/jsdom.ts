import { JSDOM } from "jsdom";

export const getDocument = async (url: string): Promise<Document> => {
  const response = await fetch(url);
  const text = await response.text();
  const dom = new JSDOM(text);
  return dom.window.document;
};
