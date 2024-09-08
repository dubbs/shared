import type { SportsEvent } from "./schema";

export const getTickets = async () => {
  const response = await fetch(
    "https://www.ticketmaster.ca/sasktel-centre-tickets-saskatoon/venue/139568",
    {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "max-age=0",
        "if-none-match": 'W/"a1eef-ZtuVtClBmbk7LGKvi46rjjXemp8"',
        priority: "u=0, i",
        "sec-ch-ua":
          '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent":
          "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36",
      },
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include",
    },
  );

  const html = await response.text();
  const matches = html.matchAll(
    /<script type="application\/ld\+json">([\s\S]+?)<\/script>/gi,
  );
  const items: SportsEvent[] = [];
  for (const match of matches) {
    const json = JSON.parse(match[1]);
    items.push(json);
  }
  return items;
};
