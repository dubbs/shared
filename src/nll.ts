import type { SportsEvent } from "./schema";

export const nll = async (): Promise<SportsEvent[]> => {
  const date = new Date();
  const dateIso = date.toISOString();
  const dateYMD = dateIso.split("T")[0];

  const response = await fetch(
    "https://stats.sports.bellmedia.ca/sports/lacrosse/leagues/nll/scheduleV2/subset/dates?brand=tsn&type=json&dateOrId=" +
      dateYMD,
  );
  const json = await response.json();

  const games: SportsEvent[] = [];
  for (const game of Object.values<any>(json)) {
    if (game) {
      for (const event of game.events) {
        const home = event.event.top;
        const away = event.event.bottom;
        games.push({
          audience: {
            audienceType: "",
          },
          startDate: event.event.dateGMT + "Z",
          location: {
            addressRegion: "",
            addressLocality: "",
            description: event.event.venue,
          },
          sport: "NLL",
          homeTeam: {
            logo: `https://tsnimages.tsn.ca/ImageProvider/TeamLogo?seoId=${home.seoIdentifier}&width=64&height=64`,
            name: `${home.location} ${home.name}`,
          },
          homeScore: home.score,
          awayTeam: {
            logo: `https://tsnimages.tsn.ca/ImageProvider/TeamLogo?seoId=${away.seoIdentifier}&width=64&height=64`,
            name: `${away.location} ${away.name}`,
          },
          awayScore: away.score,
          description: event.event.status,
        });
      }
    }
  }
  return games;
};
