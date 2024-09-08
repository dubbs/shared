import type { SportsEvent } from "./schema";
import { esportsdeskjson } from "./esports.ts";

const Games = async (): Promise<SportsEvent[]> => {
  const json = await esportsdeskjson("https://www.pjhl.ca", "2197", "5172");

  const parseLocality = (location: string) => {
    if (location.includes("Rod Hamm")) {
      return "Saskatoon";
    }
    if (location.includes("Al Ritchie")) {
      return "Regina";
    }
    if (location.includes("Southland Co-op Arena")) {
      return "Assiniboia";
    }
    return "???? " + location;
  };

  const parseDescription = (description: string | object) => {
    if (typeof description === "object") {
      if (description.a[0].span) {
        return description.a[0].span[0];
      }
      if (description.a[0].h5) {
        return description.a[0].h5[0].span[0];
      }
      return "Unknown";
    }
    if (description.includes("AM") || description.includes("PM")) {
      return "Pre-Game";
    }
    return description;
  };

  const parseLogo = (teamName: string) => {
    switch (teamName) {
      case "Saskatoon Westleys":
        return "https://www.pjhl.ca/media/leagues/2197/graphics/images/logos/westleys.png";
      case "Saskatoon Quakers":
        return "https://www.pjhl.ca/media/leagues/2197/graphics/images/logos/quakers.png";
      case "Saskatoon Royals":
        return "https://www.pjhl.ca/media/leagues/2197/graphics/images/logos/royals.png";
      case "Delisle Chiefs":
        return "https://www.pjhl.ca/media/leagues/2197/graphics/images/logos/chiefs.png";
      case "Fort Knox":
        return "https://www.pjhl.ca/media/leagues/2197/graphics/images/logos/fortknox.png";
      case "Prince Albert Timberjaks":
        return "https://www.pjhl.ca/media/leagues/2197/graphics/images/logos/timberjaks.png";
      case "Extreme Hockey Regina Capitals":
        return "https://www.pjhl.ca/media/leagues/2197/graphics/images/logos/capitals.png";
      case "Regina Silver Foxes":
        return "https://www.pjhl.ca/media/leagues/2197/graphics/images/logos/silverfoxes.png";
      case "Richardson Pioneer Southern Rebels":
        return "https://www.pjhl.ca/media/leagues/2197/graphics/images/logos/rebels.png";
      case "Pilot Butte Storm":
        return "https://www.pjhl.ca/media/leagues/2197/graphics/images/logos/storm.png";
      case "Carrot River Outback Thunder":
        return "https://www.pjhl.ca/media/leagues/2197/graphics/images/logos/thunder.png";
    }
  };

  const games = json.table.tbody[0].tr
    .map((obj: any) => {
      if (!obj.td[1]) {
        return null;
      }

      const date = new Date(
        Date.parse(obj.td[1].replace("SK", "") + " GMT-0600"),
      ).toISOString();

      const event: SportsEvent = {
        audience: {
          audienceType: "Local",
        },
        location: {
          description: obj.td[6],
          addressLocality: parseLocality(obj.td[6]),
          addressRegion: "",
        },
        startDate: date,
        sport: "PJHL",
        awayTeam: {
          name: obj.td[2].span[0].a[0],
          logo: parseLogo(obj.td[2].span[0].a[0]),
        },
        homeTeam: {
          name: obj.td[4].span[0].a[0],
          logo: parseLogo(obj.td[4].span[0].a[0]),
        },
        awayScore: obj.td[3].trim() || 0,
        homeScore: obj.td[5].trim() || 0,
        description: parseDescription(obj.td[0]),
      };
      return event;
    })
    .filter((x: any) => {
      const homeName = x?.homeTeam.name ?? "";
      const awayName = x?.awayTeam.name ?? "";
      const teams = homeName + awayName;
      return (
        teams.toLowerCase().includes("quakers") ||
        teams.toLowerCase().includes("royals") ||
        teams.toLowerCase().includes("westleys")
      );
    });

  return games;
};

export default Games;
