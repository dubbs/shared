import type { SportsEvent } from "./schema";
import { dateFormatIsoShort } from "./date";

export const gameCentre = async (gameId: string) => {
  const response = await fetch(
    `https://lscluster.hockeytech.com/feed/?feed=gc&key=f1aa699db3d81487&game_id=${gameId}&client_code=whl&tab=clock&lang_code=en&fmt=json`,
  );
  const json = await response.json();
  return json.GC.Clock;
};

export const sportsChl = async (url: string) => {
  const response = await fetch(url);
  const html = await response.text();
  const matches = html.matchAll(/data\: (\[\[[\S\s]+?\]\])/gi);
  const today = dateFormatIsoShort(new Date());
  const events: SportsEvent[] = [];
  for (const match of matches) {
    const json = JSON.parse(match[1]);
    for (const event of json) {
      const gameId = event[6][2].replace("https://chl.ca/whl/gamecentre/", "");
      let awayScore = event[3];
      let homeScore = event[5];
      let description = event[6][4];
      if (event[1][0] == today && !description.includes("Final")) {
        const scores = await gameCentre(gameId);
        awayScore = scores.visiting_goal_count;
        homeScore = scores.home_goal_count;
        description = scores.progress;
      }

      events.push({
        startDate: String(event[1][0] + "T06:00:00Z"),
        audience: {
          audienceType: "",
        },
        sport: "WHL",
        awayTeam: {
          name: event[2][1],
          logo: event[2][0],
        },
        homeTeam: {
          name: event[4][1],
          logo: event[4][0],
        },
        location: {
          description: event[9].split("-")[0].trim(),
          addressLocality: event[9].includes("-")
            ? event[9].split("-")[1].trim()
            : event[9],
          addressRegion: "",
        },
        awayScore: awayScore,
        homeScore: homeScore,
        description: description,
      });
    }
  }
  return events;
};
