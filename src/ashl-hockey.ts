import type { SportsEvent } from "./schema";
import * as fs from "fs";
export const getToken = async (CANLAN_USER: string, CANLAN_PASS: string) => {
  const tokenResponse = await fetch(
    "https://canlan2-api.sportninja.net/v1/auth/login",
    {
      headers: {
        accept: "application/json",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
      },
      referrer: "https://canlanstats.sportninja.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: JSON.stringify({
        email: CANLAN_USER,
        password: CANLAN_PASS,
      }),
      method: "POST",
      mode: "cors",
      credentials: "omit",
    },
  );

  const tokenJson = await tokenResponse.json();
  const access_token = tokenJson.access_token;
  return access_token;
};

export const getGames = async (
  CANLAN_USER: string,
  CANLAN_PASS: string,
  schedule = "iZHonKfIsB2RGCRC",
): Promise<SportsEvent[]> => {
  const access_token = await getToken(CANLAN_USER, CANLAN_PASS);
  const response = await fetch(
    `https://canlan2-api.sportninja.net/v1/schedules/${schedule}/games?exclude_cancelled_games=1&default=1`,
    {
      headers: {
        accept: "application/json",
        "accept-language": "en-US,en;q=0.9",
        authorization: "Bearer " + access_token,
        "content-type": "application/json",
        "sec-ch-ua":
          '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
      },
      referrer: "https://www.ashl.ca/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include",
    },
  );

  const json = await response.json();

  const parseDescription = (obj: any) => {
    if (obj.ended_at == null) {
      if (obj.current_period?.period_type?.name) {
        return (
          obj.current_period?.clock_time.slice(3) +
          " " +
          obj.current_period?.period_type?.name
        );
      }
      return "Pre-Game";
    }
    return "Final";
  };

  const games = json.data
    .map((obj: any) => {
      const event: SportsEvent = {
        audience: {
          audienceType: "Local",
        },
        location: {
          description: obj.facility.name,
          addressLocality: "",
          addressRegion: "",
        },
        startDate: obj.starts_at,
        sport: obj.schedule.name,
        awayTeam: {
          name: obj.visitingTeam.name,
          logo: "",
        },
        homeTeam: {
          name: obj.homeTeam.name,
          logo: "",
        },
        awayScore: obj.visiting_team_score ?? 0,
        homeScore: obj.home_team_score ?? 0,
        description: parseDescription(obj),
      };
      return event;
    })
    .filter((x: any) => x);

  return games;
};

export const getStats = async (page: number) => {
  const access_token = await getToken();
  const response = await fetch(
    `https://canlan2-api.sportninja.net/v1/schedules/iZHonKfIsB2RGCRC/stats/players?page=${page}&sortBy=P&sort=desc&goalie=0`,
    {
      headers: {
        accept: "application/json",
        "accept-language": "en-US,en;q=0.9",
        authorization: "Bearer " + access_token,
        "content-type": "application/json",
        "sec-ch-ua":
          '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
      },
      referrer: "https://canlanstats.sportninja.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include",
    },
  );
  const json = await response.json();
  fs.writeFileSync(`stats/${page}.json`, JSON.stringify(json));
};

export const getStatsAll = async () => {
  for (let i = 1; i <= 57; i++) {
    await getStats(i);
  }
};

export const processStats = async () => {
  const stats = [];
  for (let i = 1; i <= 57; i++) {
    const str = fs.readFileSync(`stats/${i}.json`, "utf8");
    const json = JSON.parse(str);
    for (const row of json.data) {
      let games = 0;
      let points = 0;
      for (const stat of row.stats) {
        if (stat.abbr == "GP") {
          games = stat.value;
        }
        if (stat.abbr == "P") {
          points = stat.value;
        }
      }
      stats.push({
        // id: row.player.id,
        name: row.player.name_first + " " + row.player.name_last,
        league: row.schedule.name,
        team: row.team.name_full,
        games,
        points,
      });
    }
  }
  fs.writeFileSync(`public/ashl.json`, JSON.stringify(stats));
};

export default getGames;
