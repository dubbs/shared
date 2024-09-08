import type { SportsEvent } from "./schema";

const Games = async (): Promise<SportsEvent[]> => {
  // For lscluster, playoffs will result in a new season id
  // https://www.sjhl.ca/stats/schedule/all-teams/58/1?league=3
  // https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=schedule&team=-1&season=58&month=0&location=homeaway&key=2fb5c2e84bf3e4a8&client_code=sjhl&site_id=2&league_id=3&division_id=-1&lang=en
  // https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=schedule&team=-1&season=60&location=homeaway&key=2fb5c2e84bf3e4a8&client_code=sjhl&site_id=2&league_id=3&division_id=-1&lang=en
  const result = await fetch(
    `https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=schedule&team=-1&season=60&month=0&location=homeaway&key=2fb5c2e84bf3e4a8&client_code=sjhl&site_id=2&league_id=3&division_id=-1&lang=en`,
  );

  const text = await result.text();
  const json = JSON.parse(text.slice(1, -1));

  const rows = json[0].sections[0].data.map((x) => x.row);

  const parseLogo = (teamName: string) => {
    switch (teamName) {
      case "Battlefords":
        return "https://www.sjhl.ca/wp-content/uploads/sites/2/2023/06/battlefords_north_stars.png";
      case "Estevan":
        return "https://www.sjhl.ca/wp-content/uploads/sites/2/2023/06/estevan_bruins.png";
      case "Flin Flon":
        return "https://www.sjhl.ca/wp-content/uploads/sites/2/2023/06/flin_flon_bombers.png";
      case "Humboldt":
        return "https://www.sjhl.ca/wp-content/uploads/sites/2/2023/06/humboldt_broncos.png";
      case "Kindersley":
        return "https://www.sjhl.ca/wp-content/uploads/sites/2/2023/06/kindersley_klippers.png";
      case "La Ronge":
        return "https://www.sjhl.ca/wp-content/uploads/sites/2/2023/06/la_ronge_ice_wolves.png";
      case "Melfort":
        return "https://www.sjhl.ca/wp-content/uploads/sites/2/2023/06/melfort_mustangs.png";
      case "Melville":
        return "https://www.sjhl.ca/wp-content/uploads/sites/2/2023/06/melville_millionaires.png";
      case "Notre Dame":
        return "https://www.sjhl.ca/wp-content/uploads/sites/2/2023/06/notre_dame_hounds.png";
      case "Nipawin":
        return "https://www.sjhl.ca/wp-content/uploads/sites/2/2023/06/nipawin_hawks.png";
      case "Yorkton":
        return "https://www.sjhl.ca/wp-content/uploads/sites/2/2023/06/yorkton-terriers.png";
      case "Weyburn":
        return "https://www.sjhl.ca/wp-content/uploads/sites/2/2023/06/weyburn_red_wings.png";
    }
  };

  return rows.map((row: Record<string, any>) => {
    let dateString = "";

    let dateParts = row.date_with_day.split(" ");
    let year = "2024";

    if (["Sep", "Oct", "Nov", "Dec"].includes(dateParts[1])) {
      year = "2023";
    }
    let month = dateParts[1];
    let day = dateParts[2];
    let time = "5:00 pm CST";

    if (row.game_status.includes("am") || row.game_status.includes("pm")) {
      time = row.game_status.replace(" ST", " CST");
    }

    dateString = `${month} ${day}, ${year} @ ${time}`;

    const date = new Date(Date.parse(dateString)).toISOString();

    const event: SportsEvent = {
      audience: {
        audienceType: "Local",
      },
      location: {
        description: row.venue_name,
        addressLocality: row.home_team_city,
        addressRegion: "",
      },
      startDate: date,
      sport: "SJHL",
      awayTeam: {
        name: row.visiting_team_city,
        logo: parseLogo(row.visiting_team_city),
      },
      homeTeam: {
        name: row.home_team_city,
        logo: parseLogo(row.home_team_city),
      },
      awayScore: row.visiting_goal_count == "-" ? 0 : row.visiting_goal_count,
      homeScore: row.home_goal_count == "-" ? 0 : row.home_goal_count,
      description:
        row.game_status.includes("am") || row.game_status.includes("pm")
          ? "Pre-Game"
          : row.game_status,
    };
    return event;
  });
};

export default Games;
