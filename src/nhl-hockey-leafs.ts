import type { SportsEvent } from "./schema";

const Games = async () => {
  // https://chl.ca/whl/schedule/213/281/
  // https://lscluster.hockeytech.com/feed/?feed=modulekit&view=scorebar&client_code=whl&numberofdaysahead=30&numberofdaysback=1&season_id=&team_id=213&key=f1aa699db3d81487&fmt=json

  const data = await fetch(
    "https://stats.sports.bellmedia.ca/sports/hockey/leagues/nhl/schedule/competitors/166?brand=tsn&type=json",
  );

  const result = await data.json();

  const games = result.events.map((event: any) => {
    let description = event.gameStatus;
    if (event.gameStatus.includes("AM") || event.gameStatus.includes("PM")) {
      description = "Pre-Game";
    }
    const game: SportsEvent = {
      audience: {
        audienceType: "Provincial",
      },
      location: {
        description: event.venue,
        addressLocality: "???",
        addressRegion: "???",
      },
      startDate: event.dateGMT + ".0000000Z",
      sport: "NHL",
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

      description: description,
    };
    return game;
  });

  return games;
};

export default Games;
