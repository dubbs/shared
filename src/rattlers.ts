// https://www.therattlers.ca/schedule
// searched for Winnipeg in sources
// https://ryanbarkwell.trilogycap.co/sports/get_matches.php?compId=37308
// This just requests directly from genius sports
// https://api.wh.geniussports.com/v1/basketball/competitions/37308/matcheslive?ak=2e8d9bf868121a7b9f1c4f83260dcfab&limit=500

import type { SportsEvent } from "./schema";

export const getRattlers = async () => {
  // const limit = 500
  const events: SportsEvent[] = [];
  const limit = 20;
  const response = await fetch(
    `https://api.wh.geniussports.com/v1/basketball/competitions/37308/matcheslive?ak=2e8d9bf868121a7b9f1c4f83260dcfab&limit=${limit}`,
  );

  const json = await response.json();

  for (const event of json.response.data) {
    events.push({
      startDate: event.matchTimeUTC.replace(" ", "T") + "Z",
      sport: "CEBL",
      awayTeam: {
        name: event.competitors[1].teamName,
        //   logo: event[2][0],
      },
      homeTeam: {
        name: event.competitors[0].teamName,
        // logo: event[4][0],
      },
      location: {
        description: event.venue.venueName,
        addressLocality: "",
        addressRegion: "",
        //   addressLocality: event[9].split("-")[1].trim(),
        //   addressRegion: "",
      },
      awayScore: event.competitors[1].scoreString || "-",
      homeScore: event.competitors[0].scoreString || "-",
      description: event.matchStatus,
      audience: {
        audienceType: "",
      },
    });
  }
  return events;
};
