import xml2js from "xml2js";
import { v4 as uuidv4 } from "uuid";

export type RssItem = {
  id: number;
  title: string;
  link: string;
  categories: string[];
  date: Date;
  description: string;
  thumbnail: string;
  feed: string;
};

/**
 * Convert XML string to JSON
 */
export const xmlStrToJson = async (str: string) => {
  const parser = new xml2js.Parser();
  return parser.parseStringPromise(str);
};

export const xmlUrlToJson = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      // Some RSS feeds return 403 when missing UserAgent
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36",
    },
  });
  let text = await response.text();
  return xmlStrToJson(text);
};

export const rssFeedToItems = async (
  url: string,
  feedTitle: string,
): Promise<RssItem[]> => {
  const json = await xmlUrlToJson(url);
  const items = json.rss.channel[0].item;
  let results: RssItem[] = [];
  for (let item of items) {
    const thumbnail = item["media:thumbnail"]
      ? item["media:thumbnail"][0]["$"].url
      : "";
    results.push({
      id: uuidv4(),
      feed: feedTitle,
      title: item.title[0],
      link: item.link[0],
      categories: item.category,
      date: new Date(item.pubDate[0]),
      description: item.description[0],
      thumbnail: thumbnail,
    });
  }
  return results;
};
