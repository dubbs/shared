import type { SportsEvent } from "./schema";
import { getDocument } from "./jsdom";

export const getWCBL = async (): Promise<SportsEvent[]> => {
  const document = await getDocument(
    "https://baseball.pointstreak.com/schedule.html?leagueid=154&seasonid=33919",
  );
  const table = document.querySelector("table");
  const tbody = table?.querySelector("tbody");
  const rows = tbody?.querySelectorAll("tr");

  const data: SportsEvent[] = [];
  rows?.forEach((row) => {
    let startDate = "";
    let awayTeamName = "";
    let awayTeamLogo = "";
    let awayScore = 0;
    let homeTeamLogo = "";
    let homeTeamName = "";
    let homeScore = 0;
    let locationDescription = "";

    const columns = row.querySelectorAll("td");
    columns.forEach((column, index) => {
      if (index == 1) {
        const parts = column.innerHTML.split("<br>");
        startDate = new Date(
          parts[0] + " 2024 " + parts[1] + " GMT-0600",
        ).toISOString();
      }
      if (index == 2) {
        awayTeamName = column.textContent || "";
        let teamid = column
          .querySelector("a")
          ?.getAttribute("href")
          ?.replace("team_home.html?teamid=", "")
          .split("&")[0];
        teamid = teamid == "155849" ? "163396" : teamid;
        awayTeamLogo = `https://baseball.pointstreak.com/logos/league154/team${teamid}.gif`;
      }
      if (index == 3) {
        homeTeamName = column.textContent || "";
        let teamid = column
          .querySelector("a")
          ?.getAttribute("href")
          ?.replace("team_home.html?teamid=", "")
          .split("&")[0];
        teamid = teamid == "155849" ? "163396" : teamid;
        homeTeamLogo = `https://baseball.pointstreak.com/logos/league154/team${teamid}.gif`;
      }
      if (index == 4 && column.textContent?.includes("-")) {
        const parts = column.textContent.split("-");
        awayScore = parseInt(parts[0]);
        homeScore = parseInt(parts[1]);
      }
      if (index == 7) {
        locationDescription = column.textContent || "";
      }
    });
    data.push({
      startDate,
      audience: {
        audienceType: "",
      },
      description: "",
      sport: "WCBL",
      awayTeam: {
        name: awayTeamName,
        logo: awayTeamLogo,
      },
      homeTeam: {
        name: homeTeamName,
        logo: homeTeamLogo,
      },
      location: {
        description: locationDescription,
        addressRegion: "",
        addressLocality: "",
      },
      awayScore,
      homeScore,
    });
  });

  return data;
};
