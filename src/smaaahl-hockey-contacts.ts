import type { SportsEvent } from "./schema";
import { esportsdeskjson } from "./esports";

// Saskatchewan Male AAA Hockey League U18

const Games = async (): Promise<SportsEvent[]> => {
  const json = await esportsdeskjson("https://www.smaaahl.com", "3433", "9165");

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
    return "???";
  };

  const parseDescription = (description: any) => {
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
      case "Saskatoon Contacts":
        return "https://www.smaaahl.com/media/leagues/3433/graphics/contacts.png";
      case "Warman Wildcats":
        return "https://www.smaaahl.com/media/leagues/3433/graphics/wildcats.png";
      case "Saskatoon Blazers":
        return "https://www.smaaahl.com/media/leagues/3433/graphics/blazers.png";
      case "Regina Pat Canadians":
        return "https://www.smaaahl.com/media/leagues/3433/graphics/patcanadians.png";
      case "Prince Albert Mintos":
        return "https://www.smaaahl.com/media/leagues/3433/graphics/mintos_logo_trans.png";
      case "Swift Current Legionnaires":
        return "https://www.smaaahl.com/media/leagues/3433/graphics/legionnaires.png";
      case "Moose Jaw Winmar Warriors":
        return "https://www.smaaahl.com/media/leagues/3433/graphics/warriors.png";
      case "Estevan Great North Bears":
        return "https://www.smaaahl.com/media/leagues/3433/graphics/bears.png";
      case "Notre Dame Hounds":
        return "https://www.smaaahl.com/media/leagues/3433/graphics/hounds.png";
      case "Battlefords Stars":
        return "https://www.smaaahl.com/media/leagues/3433/graphics/stars.png";
      case "Tisdale Trojans":
        return "https://www.smaaahl.com/media/leagues/3433/graphics/trojans.png";
      case "Yorkton Maulers":
        return "https://www.smaaahl.com/media/leagues/3433/graphics/maulers.png";
    }
  };

  const games = (json as any).table.tbody[0].tr
    .map((obj: any) => {
      // date is in this format: Feb. 18, 2024 @ 7:45 PM
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
        sport: "SMAAAHL",
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
        teams.toLowerCase().includes("contacts") ||
        teams.toLowerCase().includes("blazers")
      );
    });

  return games;
};

export default Games;
