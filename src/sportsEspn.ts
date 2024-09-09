import type { SportsEvent } from "./schema";

export const sportsEspn = async (
  sport: string, // football
  league: string, // nfl
): Promise<SportsEvent[]> => {
  const queryParams = new URLSearchParams({
    sport,
    league,
    region: "us",
    lang: "en",
    contentorigin: "espn",
    buyWindow: "1m",
    showAirings: "buy,live,replay",
    showZipLookup: "true",
    tz: "America/Regina",
  });
  const queryString = queryParams.toString();

  const response = await fetch(
    "https://site.web.api.espn.com/apis/v2/scoreboard/header?" + queryString,
  );

  const json = await response.json();
  const games = json.sports[0].leagues[0].events;

  return games.map((game: any) => {
    const event: SportsEvent = {
      audience: {
        audienceType: "Local",
      },
      location: {
        description: game.location,
        addressLocality: "",
        addressRegion: "",
      },
      startDate: game.date,
      sport: league.toUpperCase(),
      awayTeam: {
        name: game.competitors[0].displayName,
        logo: game.competitors[0].logoDark,
      },
      homeTeam: {
        name: game.competitors[1].displayName,
        logo: game.competitors[1].logoDark,
      },
      awayScore: game.competitors[0].score || 0,
      homeScore: game.competitors[1].score || 0,
      description: game.summary,
    };
    return event;
  });
};
