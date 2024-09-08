import { getDocument } from "./jsdom";

export const getEvents = async (): Promise<any[]> => {
  // November 2023, tourism saskatoon is now discover saskatoon
  const document = await getDocument(
    "https://www.discoversaskatoon.com/calendar-events",
  );
  const events = [...document.querySelectorAll("article.event.card")];
  return events.map((event) => {
    return {
      title: event.querySelector("h6")?.textContent?.trim(),
      location: event.querySelector(".location")?.textContent?.trim(),
      date: event.querySelector(".date")?.textContent?.trim(),
      time: event.querySelector(".time")?.textContent?.trim(),
      url:
        "https://www.discoversaskatoon.com" +
        event.querySelector("a")?.getAttribute("href")?.trim(),
      img:
        "https://www.discoversaskatoon.com" +
        event.querySelector("img")?.getAttribute("src")?.trim(),
    };
  });
};
