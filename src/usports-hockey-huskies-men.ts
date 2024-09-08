import { xmlUrlToJson } from "./xml.js";
import type { SportsEvent } from "./schema";

const Games = async () => {
  const result = await xmlUrlToJson(
    "https://huskies.usask.ca/calendar.ashx/calendar.rss?sport_id=17",
  );

  const formatScore = (x: any) => {
    return isNaN(x) ? "-" : x;
  };

  const games = result.rss.channel[0].item.map((item: any) => {
    const location = item["ev:location"][0];
    const locationParts = location.split(",").map((x: string) => x.trim());
    // location contains text saskatoon
    const isHome = location.includes("Saskatoon");
    let score = item["description"][0]
      .split("\\n")[1]
      ?.split(" ")[1]
      ?.split("-");
    let summary;
    if (score.length == 1) {
      score = [0, 0];
      summary = "Pre-Game";
    } else {
      score = score.map((x: string) => parseInt(x));
      summary = "final";
    }
    const event: SportsEvent = {
      audience: {
        audienceType: "Provincial",
      },
      startDate: item["ev:startdate"][0],
      sport: "USPORTS",
      location: {
        description: locationParts[2],
        addressLocality: locationParts[0],
        addressRegion: locationParts[1],
      },
      awayTeam: {
        name: isHome ? item["s:opponent"][0] : "Saskatchewan Huskies",
        logo: isHome ? item["s:opponentlogo"][0] : item["s:teamlogo"][0],
      },
      homeTeam: {
        name: isHome ? "Saskatchewan Huskies" : item["s:opponent"][0],
        logo: isHome ? item["s:teamlogo"][0] : item["s:opponentlogo"][0],
      },
      awayScore: formatScore(isHome ? score[1] : score[0]),
      homeScore: formatScore(isHome ? score[0] : score[1]),
      description: summary,
    };
    return event;
  });

  return games;
};

export default Games;
