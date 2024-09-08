import type { SportsEvent } from "./schema";

export const CflFootballRiders = async () => {
  // https://next-gen.sports.bellmedia.ca/v2/schedule/sports/football/leagues/cfl?brand=tsn&lang=en&season=2024
  const data = await fetch(
    `https://stats.sports.bellmedia.ca/sports/football/leagues/cfl/schedule/competitors/1073?brand=tsn&type=json`,
  );
  const result = await data.json();
  const parseLocality = (venue: string) => {
    if (venue.includes("Mosaic")) {
      return "Regina";
    }
    return "???";
  };
  const games = result.events.map((event) => {
    const game: SportsEvent = {
      audience: {
        audienceType: "Provincial",
      },
      location: {
        description: event.venue,
        addressLocality: parseLocality(event.venue),
        addressRegion: "???",
      },
      startDate: event.dateGMT + ".0000000Z",
      sport: "CFL",
      awayTeam: {
        name: event.awayEventResult.competitor.name,
        logo: `https://tsnimages.tsn.ca/ImageProvider/TeamLogo?seoId=${event.awayEventResult.competitor.seoIdentifier}&width=72&height=72`,
      },
      homeTeam: {
        name: event.homeEventResult.competitor.name,
        logo: `https://tsnimages.tsn.ca/ImageProvider/TeamLogo?seoId=${event.homeEventResult.competitor.seoIdentifier}&width=72&height=72`,
      },
      awayScore: event.awayEventResult.score ?? 0,
      homeScore: event.homeEventResult.score ?? 0,
      description: event.gameStatus,
    };
    return game;
  });

  return games;
};
